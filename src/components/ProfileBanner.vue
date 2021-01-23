<template>
    <section class="section-profile-banner" :style="{ backgroundImage: 'url(/images/' + image + ')' }">
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
    name: 'ProfileBanner',

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

<style lang="scss">
    @import '../scss/base/variables.scss';

    .section-profile-banner {
        color: $white;

        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        padding: 92px 0 108px;
        margin-bottom: -74px;

        h1 {
            font-size: 36px;
            color: inherit;
        }
    }

    .dashboard-breadcrumbs {
        font-size: 14px;
        padding: 0;
        margin: 0;
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        color: inherit;
    }

</style>