
// Concise, normalized structure with relations and in-memory update support
let campusData = [
  {
    id: 1,
    name: 'Faculty of Sciences (FC)',
    departments: [
      { id: 1, name: 'Department of Biological Sciences (DCB)', courses: [
        { id: 1, name: 'Applied Biology' },
        { id: 2, name: 'Biology and Health' },
        { id: 3, name: 'Marine, Aquatic, and Coastal Biology' },
        { id: 4, name: 'Ecology and Conservation of Terrestrial Biodiversity' }
      ]},
      { id: 2, name: 'Department of Physics (DF)', courses: [
        { id: 5, name: 'Physics' },
        { id: 6, name: 'Meteorology' }
      ]},
      { id: 3, name: 'Department of Geology (DG)', courses: [
        { id: 7, name: 'Cartography and Geological Research' },
        { id: 8, name: 'Applied Geology' },
        { id: 9, name: 'Geographical Information Science' }
      ]},
      { id: 4, name: 'Department of Mathematics and Computer Science (DMI)', courses: [
        { id: 10, name: 'Computer Science' },
        { id: 11, name: 'Mathematics' },
        { id: 12, name: 'Statistics' }
      ]},
      { id: 5, name: 'Department of Chemistry (DQ)', courses: [
        { id: 13, name: 'Environmental Chemistry' },
        { id: 14, name: 'Industrial Chemistry' }
      ]}
    ]
  },
  // ... (other faculties, departments, and courses in the same normalized format)
]

export async function getCampusData() {
  await new Promise(resolve => setTimeout(resolve, 100))
  return JSON.parse(JSON.stringify(campusData))
}

// Store-like in-memory update methods for admin/supplier actions
export async function setCampusData(newData) {
  campusData = JSON.parse(JSON.stringify(newData))
  return true
}

export async function addFaculty(faculty) {
  const newId = Math.max(0, ...campusData.map(f => f.id)) + 1
  campusData.push({ ...faculty, id: newId, departments: [] })
  return newId
}
export async function updateFaculty(id, updates) {
  const f = campusData.find(f => f.id === id)
  if (f) Object.assign(f, updates)
  return !!f
}
export async function removeFaculty(id) {
  campusData = campusData.filter(f => f.id !== id)
  return true
}
export async function addDepartment(facultyId, dept) {
  const faculty = campusData.find(f => f.id === facultyId)
  if (!faculty) return null
  const newId = Math.max(0, ...faculty.departments.map(d => d.id)) + 1
  faculty.departments.push({ ...dept, id: newId, courses: [] })
  return newId
}
export async function updateDepartment(facultyId, deptId, updates) {
  const faculty = campusData.find(f => f.id === facultyId)
  const dept = faculty?.departments.find(d => d.id === deptId)
  if (dept) Object.assign(dept, updates)
  return !!dept
}
export async function removeDepartment(facultyId, deptId) {
  const faculty = campusData.find(f => f.id === facultyId)
  if (!faculty) return false
  faculty.departments = faculty.departments.filter(d => d.id !== deptId)
  return true
}
export async function addCourse(facultyId, deptId, course) {
  const faculty = campusData.find(f => f.id === facultyId)
  const dept = faculty?.departments.find(d => d.id === deptId)
  if (!dept) return null
  const newId = Math.max(0, ...dept.courses.map(c => c.id)) + 1
  dept.courses.push({ ...course, id: newId })
  return newId
}
export async function updateCourse(facultyId, deptId, courseId, updates) {
  const faculty = campusData.find(f => f.id === facultyId)
  const dept = faculty?.departments.find(d => d.id === deptId)
  const course = dept?.courses.find(c => c.id === courseId)
  if (course) Object.assign(course, updates)
  return !!course
}
export async function removeCourse(facultyId, deptId, courseId) {
  const faculty = campusData.find(f => f.id === facultyId)
  const dept = faculty?.departments.find(d => d.id === deptId)
  if (!dept) return false
  dept.courses = dept.courses.filter(c => c.id !== courseId)
  return true
}
