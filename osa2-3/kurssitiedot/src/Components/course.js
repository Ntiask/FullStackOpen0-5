
const Course = ({course}) => {
    function getSum(total, num) {
      return total + Math.round(num);
    }
  
    const array1 = course.parts.map(x =>x.exercises)
    const total = array1.reduce(getSum, 0)
  
    return <div>
      <h1>{course.name}</h1>
      {course.parts.map(c => <li key={c.id}> {c.name} {c.exercises}</li>)}
      <p>Total of {total} exercises</p>
      </div>
    
    }

    export default Course