import { useEffect, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useData from "../../customHooks/useData";
import api from "../../utils/axiosInstance";
import './courses.css'
import DynamicSVG from "../svg/DynamicSVG";

const CourseHome = () => {
  const { courses, teachers, departments, setCourses } = useData();
  const location = useLocation();
  const navigate = useNavigate()
  const [selectedFilter, setSelectedFilter] = useState({ query: 'all', id: null });

  const departmentId = location.search.includes('department') ? location.search.split('=')[1] : null;
  const teacherId = location.search.includes('teacher') ? location.search.split('=')[1] : null;

  const getCourseByFilter = useCallback(async (query, id = null) => {
    try {
      let res;
      if (query === 'teacher') {
        res = await api.get(`courses/?teacher=${id}`);
      } else if (query === 'department') {
        res = await api.get(`courses/?department=${id}`);
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
    const getCourseByDepartment = async () => {
      try {
        if (departmentId) {
          await getCourseByFilter('department', departmentId)
        } else if (teacherId) {
          await getCourseByFilter('teacher', teacherId)
        }
        else {
          await getCourseByFilter('all');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCourseByDepartment();
  }, [departmentId, teacherId, getCourseByFilter]);

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
              {departments.map((department) => (
                <div
                  onClick={() => getCourseByFilter('department', department.id)}
                  key={department.id}
                  className={`option ${selectedFilter.query === 'department' && selectedFilter.id === department.id ? 'selected' : ''}`}
                >
                  <div className="fa-solid fa-angle-right"></div>
                  <div>{department.name}</div>
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
