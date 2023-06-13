<script>
import axios from "axios";
import AppHeader from "./components/AppHeader.vue";
import ProjectCard from "./components/ProjectCard.vue";

export default {
    name: "App",
    components: {
        AppHeader,
        ProjectCard,
    },
    data() {
        return {
            host: "http://127.0.0.1:8000/",
            projectsEndpoint: "api/projects",
            imagesPath: "storage/",
            projects: [],
        }
    },
    methods: {

    },
    mounted() {
        const fullUrl = this.host + this.projectsEndpoint;
        axios
        .get(fullUrl)
        .then(response => {
            this.projects = response.data.projects.data;
        })
        .catch(error => {
            console.error(error);
        })
    }
}
</script>

<template>
    <AppHeader/>
    <div class="container py-5">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            <div class="col" v-for="project in projects">
                <ProjectCard :project="project" :host="host" :imagesPath="imagesPath"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use './styles/general.scss';
</style>
