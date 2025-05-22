<template>
  <div class="campus-manager">
    <h3>Faculdades, Departamentos e Cursos</h3>
    <div class="faculty-section">
      <button @click="addFaculty">Adicionar Faculdade</button>
      <div v-for="(faculty, fIdx) in data" :key="faculty.faculty" class="faculty-block">
        <input v-model="faculty.faculty" placeholder="Nome da Faculdade" />
        <button @click="removeFaculty(fIdx)">Remover Faculdade</button>
        <div class="department-section">
          <button @click="addDepartment(fIdx)">Adicionar Departamento</button>
          <div v-for="(dept, dIdx) in faculty.departments" :key="dept.name" class="department-block">
            <input v-model="dept.name" placeholder="Nome do Departamento" />
            <button @click="removeDepartment(fIdx, dIdx)">Remover Departamento</button>
            <div class="course-section">
              <button @click="addCourse(fIdx, dIdx)">Adicionar Curso</button>
              <div v-for="(course, cIdx) in dept.courses" :key="course" class="course-block">
                <input v-model="dept.courses[cIdx]" placeholder="Nome do Curso" />
                <button @click="removeCourse(fIdx, dIdx, cIdx)">Remover Curso</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="save" class="save-btn">Salvar Estrutura</button>
    <div v-if="saved" class="saved-message">Estrutura salva!</div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getCampusData } from '@/services/campus'

const data = ref([])
const saved = ref(false)

async function load() {
  data.value = JSON.parse(JSON.stringify(await getCampusData()))
}

function addFaculty() {
  data.value.push({ faculty: '', departments: [] })
}
function removeFaculty(fIdx) {
  data.value.splice(fIdx, 1)
}
function addDepartment(fIdx) {
  data.value[fIdx].departments.push({ name: '', courses: [] })
}
function removeDepartment(fIdx, dIdx) {
  data.value[fIdx].departments.splice(dIdx, 1)
}
function addCourse(fIdx, dIdx) {
  data.value[fIdx].departments[dIdx].courses.push('')
}
function removeCourse(fIdx, dIdx, cIdx) {
  data.value[fIdx].departments[dIdx].courses.splice(cIdx, 1)
}
function save() {
  // In a real app, send to backend. Here, just show feedback.
  saved.value = true
  setTimeout(() => (saved.value = false), 2000)
}

load()
</script>

<style scoped>
.campus-manager { margin-top: 2rem; }
.faculty-block, .department-block, .course-block { margin-bottom: 0.5rem; }
input { margin-right: 0.5rem; }
button { margin-right: 0.5rem; }
.save-btn { margin-top: 1rem; }
.saved-message { color: green; margin-top: 1rem; }
</style>
