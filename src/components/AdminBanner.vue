<template>
    <section class="section-admin-banner" :style="{ backgroundImage: 'url(/images/' + image + ')' }">
        <div class="container">
            <h1>{{captionBanner}}
                <template v-if="userName">
                    - {{userName}}
                </template>
            </h1>
            <ul class="dashboard-breadcrumbs">
                <li>{{typePage}}</li>
            </ul>
        </div>
    </section>
</template>

<script>

export default {
    name: 'AdminBanner',

    props: {
        captionBanner: {
            type: String,
            required: false,
            default: '',
        },
        userName: {
            type: String,
            required: false,
            default: '',
        },
        typePage: {
            type: String,
            required: false,
            default: '',
        },
        image: {
            type: String,
            required: true,
            default: '',
        }
    },
}
</script>