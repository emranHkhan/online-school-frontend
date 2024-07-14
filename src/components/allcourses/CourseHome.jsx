import { useEffect, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useData from "../../customHooks/useData";
import api from "../../utils/axiosInstance";
import './courses.css'
import DynamicSVG from "../svg/DynamicSVG";

const CourseHome = () => {
  const { courses, teachers, categories, setCourses } = useData();
  const location = useLocation();
  const navigate = useNavigate()
  const [selectedFilter, setSelectedFilter] = useState({ query: 'all', id: null });

  const categoryId = location.search.split('=')[1];

  const getCourseByFilter = useCallback(async (query, id = null) => {
    try {
      let res;
      if (query === 'teacher') {
        res = await api.get(`courses/?teacher=${id}`);
      } else if (query === 'category') {
        res = await api.get(`courses/?category=${id}`);
      } else {
        res = await api.get('courses/');
      }
      setCourses(res.data);
      setSelectedFilter({ query, id });
    } catch (error) {
      console.error(error);
    }
  }, [setCourses]);

  useEffect(() => {
    const getCourseByCategory = async () => {
      try {
        if (categoryId) {
          const res = await api.get(`courses/?category=${categoryId}`);
          setCourses(res.data);
          setSelectedFilter({ query: 'category', id: categoryId });
        } else {
          await getCourseByFilter('all');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCourseByCategory();
  }, [categoryId, getCourseByFilter, setCourses]);

  const handleClick = (course) => {
    navigate(`/course/${course.id}`, { state: { course } });
  }

  return (
    <>
      <div className="container">
        <section className="course-options">
          <div className="sidebar">
            <div>
              <h3>All</h3>
              <hr />
              <div
                onClick={() => getCourseByFilter('all')}
                className={`option ${selectedFilter.query === 'all' ? 'selected' : ''}`}
              >
                <div className="fa-solid fa-angle-right"></div>
                <div>All Courses</div>
              </div>
            </div>
            <div>
              <h3>Teacher</h3>
              <hr />
              {teachers.map((teacher) => (
                <div
                  onClick={() => getCourseByFilter('teacher', teacher.id)}
                  key={teacher.id}
                  className={`option ${selectedFilter.query === 'teacher' && selectedFilter.id === teacher.id ? 'selected' : ''}`}
                >
                  <div className="fa-solid fa-angle-right"></div>
                  <div>{teacher.first_name} {teacher.last_name}</div>
                </div>
              ))}
            </div>
            <div>
              <h3>Department</h3>
              <hr />
              {categories.map((category) => (
                <div
                  onClick={() => getCourseByFilter('category', category.id)}
                  key={category.id}
                  className={`option ${selectedFilter.query === 'category' && selectedFilter.id === category.id ? 'selected' : ''}`}
                >
                  <div className="fa-solid fa-angle-right"></div>
                  <div>{category.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="content">
            <div className="course-card-container">
              {courses?.courses?.map((course) => (
                <div className="card" key={course.id}>
                  <div className="card-header">
                    <DynamicSVG words={course.title} />
                    <div>
                      <h1 className="title">{course.title}</h1>
                      <h4 className="teacher"><small>by</small> {course.teacher_name}</h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="description">{course.description.slice(0, 200)}...</p>
                    <strong><i className="fa-solid fa-money-check-dollar"></i> &#2547; {course.price}</strong>
                  </div>
                  <button className="outline-btn" onClick={() => handleClick(course)}>SEE DETAILS !</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CourseHome;
