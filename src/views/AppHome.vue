<script>
import axios from "axios";
import ProjectCard from "../components/ProjectCard.vue";
import PageLoader from "../components/PageLoader.vue";

export default {
    name: "AppHome",
    components: {
    ProjectCard,
    PageLoader,
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
            prevPageUrl: "",
            nextPageUrl: "",
            loading: true,
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
                this.prevPageUrl = response.data.projects.prev_page_url;
                this.nextPageUrl = response.data.projects.next_page_url;
                this.loading = false;
            })
            .catch(error => {
                console.error(error.message);
            })
        },
        getPaginationLabel(currentPage, paginationElement) {
            if(paginationElement === 0) {
                if(currentPage === 1) {
                    return 1;
                } else if(currentPage < this.pages) {
                    return currentPage - 1;
                } else {
                    return currentPage - 2;
                }
            } else if(paginationElement === 1) {
                if(currentPage === 1) {
                    return 2;
                } else if(currentPage === this.pages) {
                    return currentPage - 1;
                } else {
                    return currentPage;
                }
            } else {
                if(currentPage === this.pages) {
                    return currentPage;
                } else if(currentPage === 1) {
                    return 3;
                } else {
                    return currentPage + 1;
                }
            }
        },
        getPaginationStyle(currentPage, paginationElement) {
            if(paginationElement === 0) {
                if(currentPage === 1) {
                    return "bg_custom_green text-black unclickable";
                } else {
                    return "bg-black text_custom_green";
                }
            } else if(paginationElement === 1) {
                if(currentPage === 1 || currentPage === this.pages) {
                    return "bg-black text_custom_green";
                } else {
                    return "bg_custom_green text-black unclickable";
                }
            } else {
                if(currentPage === this.pages) {
                    return "bg_custom_green text-black unclickable";
                } else {
                    return "bg-black text_custom_green";
                }
            }
        },
        getPaginationLink(currentPage, paginationElement) {
            if(paginationElement === 0) {
                if(currentPage === 1) {
                    return "";
                } else if(currentPage < this.pages) {
                    this.getProjects(this.prevPageUrl);
                    return;
                } else {
                    this.getProjects(this.host + this.projectsEndpoint + '?page=' + (currentPage - 2));
                    return;
                }
            } else if(paginationElement === 1) {
                if(currentPage === 1) {
                    this.getProjects(this.host + this.projectsEndpoint + '?page=2');
                    return;
                } else if(currentPage === this.pages) {
                    this.getProjects(this.host + this.projectsEndpoint + '?page=' + (this.pages - 1));
                    return;
                } else {
                    return "";
                }
            } else {
                if(currentPage === this.pages) {
                    return "";
                } else if(currentPage === 1) {
                    this.getProjects(this.host + this.projectsEndpoint + '?page=3');
                    return;
                } else {
                    this.getProjects(this.nextPageUrl);
                    return;
                }
            }
        }
    },
    mounted() {
        const fullUrl = this.host + this.projectsEndpoint;
        this.getProjects(fullUrl);
    }
}
</script>

<template>
  <div class="container py-5">
    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4" v-if="!loading">
        <div class="col" v-for="project in projects">
            <ProjectCard :project="project" :host="host" :imagesPath="imagesPath"/>
        </div>
    </div>
    <PageLoader v-else>
        LOADING PROJECTS...
    </PageLoader>
    <div class="text-end py-4 portfolio_pagination" v-if="pages >= 3">
        <a @click="currentPage === 1 ? '' : getProjects(firstPageUrl)" :class="currentPage === 1 ? 'bg-black text-secondary unclickable' : 'bg-black text_custom_green'">First</a>
        <a @click="currentPage === 1 ? '' : getProjects(prevPageUrl)" :class="currentPage === 1 ? 'bg-black text-secondary unclickable' : 'bg-black text_custom_green'">Prev</a>
        <a @click="getPaginationLink(currentPage, 0)" :class="getPaginationStyle(currentPage, 0)">{{ getPaginationLabel(currentPage, 0) }}</a>
        <a @click="getPaginationLink(currentPage, 1)" :class="getPaginationStyle(currentPage, 1)">{{ getPaginationLabel(currentPage, 1) }}</a>
        <a @click="getPaginationLink(currentPage, 2)" :class="getPaginationStyle(currentPage, 2)">{{ getPaginationLabel(currentPage, 2) }}</a>
        <a @click="currentPage === pages ? '' : getProjects(nextPageUrl)" :class="currentPage === pages ? 'bg-black text-secondary unclickable' : 'bg-black text_custom_green'">Next</a>
        <a @click="currentPage === pages ? '' : getProjects(lastPageUrl)" :class="currentPage === pages ? 'bg-black text-secondary unclickable' : 'bg-black text_custom_green'">Latest</a>
    </div>
    <div class="text-end py-4 portfolio_pagination" v-else-if="pages === 2">
        <a @click="currentPage === 1 ? '' : getProjects(firstPageUrl)" :class="currentPage === 1 ? 'bg-black text-secondary unclickable' : 'bg-black text_custom_green'">First</a>
        <a @click="currentPage === 1 ? '' : getProjects(firstPageUrl)" :class="currentPage === 1 ? 'bg-black text-secondary unclickable' : 'bg-black text_custom_green'">Prev.</a>
        <a @click="currentPage === 1 ? '' : getProjects(firstPageUrl)" :class="currentPage === 1 ? 'bg_custom_green text-black unclickable' : 'bg-black text_custom_green'">1</a>
        <a @click="currentPage === 2 ? '' : getProjects(lastPageUrl)" :class="currentPage === 2 ? 'bg_custom_green text-black unclickable' : 'bg-black text_custom_green'">2</a>
        <a @click="currentPage === 2 ? '' : getProjects(lastPageUrl)" :class="currentPage === 2 ? 'bg-black text-secondary unclickable' : 'bg-black text_custom_green'">Next</a>
        <a @click="currentPage === 2 ? '' : getProjects(lastPageUrl)" :class="currentPage === 2 ? 'bg-black text-secondary unclickable' : 'bg-black text_custom_green'">Latest</a>
    </div>
  </div>
</template>
