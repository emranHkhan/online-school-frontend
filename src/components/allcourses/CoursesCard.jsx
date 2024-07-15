// /* eslint-disable react/prop-types */
// import "./courses.css"
// import { useNavigate } from "react-router-dom"
// import DynamicSVG from "../svg/DynamicSVG"

// const CoursesCard = ({ course }) => {
//   const navigate = useNavigate()

//   const handleDetails = (course) => {
//     navigate(`/course/${course.id}`, { state: { course } });
//   }

//   return (
//     <>
//       <div className=''>
//         <div className=''>
//           <div className=''>
//             <DynamicSVG words={course.title} />
//           </div>
//           <div className=''>
//             <h1 className="">{course.title}</h1>
//             <div className=''>
//               <div className=''>
//                 <div className=''>
//                   <h4><small>by</small> {course.teacher_name}</h4>
//                   <p>{course.description.slice(0, 200)}...</p>
//                   <strong>Enrolled: {course.students.length}</strong>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className=''>
//           <h3>
//             {course.price} &#2547;
//           </h3>
//         </div>
//         <button className='outline-btn' onClick={() => handleDetails(course)}>SEE DETAILS !</button>
//       </div>
//     </>
//   )
// }

// export default CoursesCard
