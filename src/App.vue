<script>
import axios from "axios"

export default {
    name: "App",
    components: {

    },
    data() {
        return {
            host: "http://127.0.0.1:8000/",
            projectsEndpoint: "api/projects",
            projects: [],
        }
    },
    methods: {

    },
    mounted() {
        const fullUrl = this.host + this.projectsEndpoint;
        axios.get(fullUrl)
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
    <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
            <div class="col" v-for="project in projects">
                <div class="card">
                    <div class="card-header">
                        {{ project.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use './styles/general.scss';
</style>