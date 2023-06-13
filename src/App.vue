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
            currentPage: 1,
            pages: 1,
            firstPageUrl: "",
            lastPageUrl: "",
        }
    },
    methods: {
        getProjects(url) {
            axios.get(url)
            .then(response => {
                this.projects = response.data.projects.data;
                this.currentPage = response.data.projects.current_page;
                this.pages = response.data.projects.last_page;
                this.firstPageUrl = response.data.projects.first_page_url;
                this.lastPageUrl = response.data.projects.last_page_url;
            })
            .catch(error => {
                console.error(error);
            })
        },
    },
    mounted() {
        const fullUrl = this.host + this.projectsEndpoint;
        this.getProjects(fullUrl);
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
        <div class="text-end py-4 portfolio_pagination" v-if="pages >= 3">
            <a href="">First</a>
            <a href="">Prev</a>
            <a href="">{{ currentPage - 1 }}</a>
            <a href="">{{ currentPage }}</a>
            <a href="">{{ currentPage + 1 }}</a>
            <a href="">Next</a>
            <a href="">Latest</a>
        </div>
        <div class="text-end py-4 portfolio_pagination" v-else-if="pages === 2">
            <a @click="currentPage === 1 ? '' : getProjects(firstPageUrl)" :class="currentPage === 1 ? 'bg-black text-secondary unclickable' : 'bg-black text_custom_green' ">First</a>
            <a @click="currentPage === 1 ? '' : getProjects(firstPageUrl)" :class="currentPage === 1 ? 'bg-black text-secondary unclickable' : 'bg-black text_custom_green' ">Prev.</a>
            <a @click="currentPage === 1 ? '' : getProjects(firstPageUrl)" :class="currentPage === 1 ? 'bg_custom_green text-black unclickable' : 'bg-black text_custom_green' ">1</a>
            <a @click="currentPage === 2 ? '' : getProjects(lastPageUrl)" :class="currentPage === 2 ? 'bg_custom_green text-black unclickable' : 'bg-black text_custom_green' ">2</a>
            <a @click="currentPage === 2 ? '' : getProjects(lastPageUrl)" :class="currentPage === 2 ? 'bg-black text-secondary unclickable' : 'bg-black text_custom_green' ">Next</a>
            <a @click="currentPage === 2 ? '' : getProjects(lastPageUrl)" :class="currentPage === 2 ? 'bg-black text-secondary unclickable' : 'bg-black text_custom_green' ">Latest</a>
        </div>
    </div>
</template>

<style lang="scss">
@use './styles/general.scss';
</style>
