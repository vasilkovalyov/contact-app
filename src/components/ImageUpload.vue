<template>
    <div class="image-upload">
        <div class="image-upload__thumbnail" v-if="!file">
            <svg xmlns="http://www.w3.org/2000/svg" id="Icons_Dark_Profile_Copy" data-name="Icons/Dark/Profile Copy" width="20" height="20" viewBox="0 0 20 20">
                <g id="icons8-user" transform="translate(3.123 3.125)">
                    <path id="Shape" d="M12.608,14.375H1.144A1.136,1.136,0,0,1,.12,13.736a1.1,1.1,0,0,1,.115-1.18C1.125,11.4,4.286,10,6.876,10s5.751,1.4,6.641,2.556a1.1,1.1,0,0,1,.115,1.18A1.135,1.135,0,0,1,12.608,14.375ZM6.877,8.125a3.754,3.754,0,0,1-3.75-3.75V3.75a3.75,3.75,0,1,1,7.5,0v.625A3.754,3.754,0,0,1,6.877,8.125Z" transform="translate(0)" fill="#526484"/>
                </g>
            </svg>
        </div>
        <div class="image-upload__image-holder" v-else>
            <img :src="file" alt="">
        </div>
        <div class="image-upload__btn-wrap">
            <input type="file" :name="name" ref="file" hidden @change="handleFileUpload">
            <FormButton :buttonClass="['btn__primary']" @clickHandler="submitFile">Upload</FormButton>
            <FormButton :buttonClass="['btn__secondary']" @clickHandler="handleClickReset">Reset</FormButton>
        </div>
    </div>
</template>

<script>

import FormButton from './FormsComponents/FormButton';


export default {
    name: 'ImageUpload',

    props: ['image', 'name'],

    components: {
        FormButton,
    },

    watch: {
        image(val, oldVal) {
            this.file = val;
        }
    },

    data() {
        return {
            file: this.image
        }
    },

    methods: {
        submitFile() {
            this.$refs.file.click();
        },

        handleFileUpload(e) {
            const files = e.target.files;
            
            let file = files[0];
            
            if(file.name.lastIndexOf('.') <= 0) {
                return alert("Please add a valid file");
            }

            const fileReader = new FileReader();
            
            fileReader.addEventListener('load', () => {
                this.file = fileReader.result;
            })

            fileReader.readAsDataURL(files[0])

            this.$emit('imageUploadHandler', file)
        },

        handleClickReset() {
            this.file = '';
            this.$emit('imageUploadHandler', null)
        }
    },
}

</script>

<style lang="scss">
    .image-upload {
        width: 100%;

        &__image-holder {
            max-width: 218px;
            width: 100%;
            height: 218px;
            margin: 0 auto 30px;
            overflow: hidden;

            img {
                border-radius: 50%;
                overflow: hidden;
            }
        }

        &__thumbnail {
            max-width: 218px;
            width: 100%;
            height: 218px;
            margin: 0 auto 30px;

            svg {
                width: 100%;
                height: 220px;

                g {
                    width: inherit;
                }
            }
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &__btn-wrap {
            display: flex;
            justify-content: center;

            .btn {
                margin: 0 10px 20px;
            }
        }
    }
</style>