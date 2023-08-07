<script>
import { state } from "../state";
import axios from "axios";
import ProjectCard from "../components/ProjectCard.vue";
import PageLoader from "../components/PageLoader.vue";
import SectionTitle from "../components/SectionTitle.vue";
import { nextTick } from "vue";

export default {
    name: "ProjectsView",
    components: {
    ProjectCard,
    PageLoader,
    SectionTitle,
},
    data() {
        return {
            state,
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
                nextTick(window.scrollTo(0, 0));
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
                    return "bg_accent_custom text_dark_custom unclickable";
                } else {
                    return "bg_dark_custom text_accent_custom";
                }
            } else if(paginationElement === 1) {
                if(currentPage === 1 || currentPage === this.pages) {
                    return "bg_dark_custom text_accent_custom";
                } else {
                    return "bg_accent_custom text_dark_custom unclickable";
                }
            } else {
                if(currentPage === this.pages) {
                    return "bg_accent_custom text_dark_custom unclickable";
                } else {
                    return "bg_dark_custom text_accent_custom";
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
                    this.getProjects(state.host + state.projectsEndpoint + '?page=' + (currentPage - 2));
                    return;
                }
            } else if(paginationElement === 1) {
                if(currentPage === 1) {
                    this.getProjects(state.host + state.projectsEndpoint + '?page=2');
                    return;
                } else if(currentPage === this.pages) {
                    this.getProjects(state.host + state.projectsEndpoint + '?page=' + (this.pages - 1));
                    return;
                } else {
                    return "";
                }
            } else {
                if(currentPage === this.pages) {
                    return "";
                } else if(currentPage === 1) {
                    this.getProjects(state.host + state.projectsEndpoint + '?page=3');
                    return;
                } else {
                    this.getProjects(this.nextPageUrl);
                    return;
                }
            }
        }
    },
    mounted() {
        const fullUrl = state.host + state.projectsEndpoint;
        this.getProjects(fullUrl);
    }
}
</script>

<template>
  <div class="container py-5">
    <SectionTitle>
        PROJECTS
    </SectionTitle>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center g-3" v-if="!loading">
        <div class="col" v-for="project in projects">
            <ProjectCard :project="project" :host="state.host" :imagesPath="state.imagesPath" />
            <h5 class="text_accent_custom text-center text-uppercase pt-1 mb-0 fw-bold">{{ project.name }}</h5>
        </div>
    </div>
    <PageLoader v-else>
        <span class="loaderDot">.</span>
        <span class="loaderDot">.</span>
        <span class="loaderDot">.</span>
        LOADING PROJECTS
        <span class="loaderDot">.</span>
        <span class="loaderDot">.</span>
        <span class="loaderDot">.</span>
    </PageLoader>
    <div id="projectsPagination" class="mb-0 d-sm-none" v-if="pages > 1">
        <div class="text-end pt-5 portfolio_pagination">
            <a @click="currentPage === 1 ? '' : getProjects(firstPageUrl)" :class="currentPage === 1 ? 'bg_dark_custom text-secondary unclickable' : 'bg_dark_custom text_accent_custom'">First</a>
            <a @click="currentPage === 1 ? '' : getProjects(prevPageUrl)" :class="currentPage === 1 ? 'bg_dark_custom text-secondary unclickable' : 'bg_dark_custom text_accent_custom'">Prev</a>
            <a @click="" class="bg_accent_custom text_dark_custom unclickable">{{ currentPage }}</a>
            <a @click="currentPage === pages ? '' : getProjects(nextPageUrl)" :class="currentPage === pages ? 'bg_dark_custom text-secondary unclickable' : 'bg_dark_custom text_accent_custom'">Next</a>
            <a @click="currentPage === pages ? '' : getProjects(lastPageUrl)" :class="currentPage === pages ? 'bg_dark_custom text-secondary unclickable' : 'bg_dark_custom text_accent_custom'">Latest</a>
        </div>
    </div>
    <div id="projectsPagination" class="mb-0 d-none d-sm-block" v-if="pages > 1">
        <div class="text-end pt-5 portfolio_pagination" v-if="pages >= 3">
            <a @click="currentPage === 1 ? '' : getProjects(firstPageUrl)" :class="currentPage === 1 ? 'bg_dark_custom text-secondary unclickable' : 'bg_dark_custom text_accent_custom'">First</a>
            <a @click="currentPage === 1 ? '' : getProjects(prevPageUrl)" :class="currentPage === 1 ? 'bg_dark_custom text-secondary unclickable' : 'bg_dark_custom text_accent_custom'">Prev</a>
            <a @click="getPaginationLink(currentPage, 0)" :class="getPaginationStyle(currentPage, 0)">{{ getPaginationLabel(currentPage, 0) }}</a>
            <a @click="getPaginationLink(currentPage, 1)" :class="getPaginationStyle(currentPage, 1)">{{ getPaginationLabel(currentPage, 1) }}</a>
            <a @click="getPaginationLink(currentPage, 2)" :class="getPaginationStyle(currentPage, 2)">{{ getPaginationLabel(currentPage, 2) }}</a>
            <a @click="currentPage === pages ? '' : getProjects(nextPageUrl)" :class="currentPage === pages ? 'bg_dark_custom text-secondary unclickable' : 'bg_dark_custom text_accent_custom'">Next</a>
            <a @click="currentPage === pages ? '' : getProjects(lastPageUrl)" :class="currentPage === pages ? 'bg_dark_custom text-secondary unclickable' : 'bg_dark_custom text_accent_custom'">Latest</a>
        </div>
        <div class="text-end pt-5 portfolio_pagination" v-else-if="pages === 2">
            <a @click="currentPage === 1 ? '' : getProjects(firstPageUrl)" :class="currentPage === 1 ? 'bg_dark_custom text-secondary unclickable' : 'bg_dark_custom text_accent_custom'">First</a>
            <a @click="currentPage === 1 ? '' : getProjects(firstPageUrl)" :class="currentPage === 1 ? 'bg_dark_custom text-secondary unclickable' : 'bg_dark_custom text_accent_custom'">Prev.</a>
            <a @click="currentPage === 1 ? '' : getProjects(firstPageUrl)" :class="currentPage === 1 ? 'bg_accent_custom text_dark_custom unclickable' : 'bg_dark_custom text_accent_custom'">1</a>
            <a @click="currentPage === 2 ? '' : getProjects(lastPageUrl)" :class="currentPage === 2 ? 'bg_accent_custom text_dark_custom unclickable' : 'bg_dark_custom text_accent_custom'">2</a>
            <a @click="currentPage === 2 ? '' : getProjects(lastPageUrl)" :class="currentPage === 2 ? 'bg_dark_custom text-secondary unclickable' : 'bg_dark_custom text_accent_custom'">Next</a>
            <a @click="currentPage === 2 ? '' : getProjects(lastPageUrl)" :class="currentPage === 2 ? 'bg_dark_custom text-secondary unclickable' : 'bg_dark_custom text_accent_custom'">Latest</a>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_ProjectsView.scss";
</style>
