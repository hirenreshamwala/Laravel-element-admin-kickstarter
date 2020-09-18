<template>
    <el-form ref="form" label-width="120px">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="Default Image" class="el-form-item--label-top">
                    <el-upload
                        class="avatar-uploader"
                        :data="uploadAdditionalData"
                        accept=" .jpg, .jpeg, .png"
                        :action="url"
                        :auto-upload="true"
                        :show-file-list="false"
                        :on-progress="onProgressDefault"
                        :on-success="handleMainImageSuccess"
                        :before-upload="beforeMainImageUpload">

                        <el-progress v-if="showDefaultImageProgress" type="circle" :percentage="defaultImageProgress"></el-progress>
                        <div v-else>
                            <div class="el-upload-list el-upload-list--picture-card" v-if="default_image_url">
                                <img  :src="default_image_url" class="avatar">
                                <span class="el-upload-list__item-actions">
                                        <a href="#" @click.prevent.stop="onDeleteDefaultImage"><span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></a>
                                    </span>
                            </div>

                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>

                    </el-upload>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Dark Image" class="el-form-item--label-top">
                    <el-upload
                        class="avatar-uploader"
                        :data="uploadAdditionalData"
                        accept=" .jpg, .jpeg, .png"
                        :action="url"
                        :auto-upload="true"
                        :show-file-list="false"
                        :on-progress="onProgressDark"
                        :on-success="handleDarkImageSuccess"
                        :before-upload="beforeDarkImageUpload">

                        <el-progress v-if="showDarkImageProgress" type="circle" :percentage="darkImageProgress"></el-progress>
                        <div v-else>
                            <div class="el-upload-list el-upload-list--picture-card" v-if="dark_image_url">
                                <img  :src="dark_image_url" class="avatar">
                                <span class="el-upload-list__item-actions">
                                        <a href="#" @click.prevent.stop="onDeleteDarkImage"><span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></a>
                                    </span>
                            </div>

                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>


                    </el-upload>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Surface Images" class="el-form-item--label-top">
                    <el-upload
                        :action="url"
                        list-type="picture-card"
                        accept=".png, .svg"
                        :data="uploadAdditionalData"
                        :file-list="surfaceImgs"
                        multiple
                        :on-success="handleSurfaceImagesSuccess"
                        :on-remove="handleRemoveSurfaceImage"
                        :auto-upload="true">
                        <i slot="default" class="el-icon-plus"></i>

                    </el-upload>
                </el-form-item>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
import Helper from "../../helper";
import {deepClone} from "../../utils/index";
export default {
    name: 'JobImageUpload',
    data(){
        return {
            dialogImageUrl: '',
            dialogVisible: false,

            defaultImageProgress: 0,
            showDefaultImageProgress: false,

            darkImageProgress: 0,
            showDarkImageProgress: false,

            _id: '',
            default_image: '',
            default_image_url: '',
            dark_image: '',
            dark_image_url: '',
            surfaces: [],
            surfaces_tmp: [],
        }
    },
    props: {
        url: {
            type: String,
            default: ''
        },
        Id: {
            type: Number,
            default: 0
        },
        defaultImgName: {
            type: String,
            default: ''
        },
        defaultImgUrl: {
            type: String,
            default: ''
        },
        darkImgName: {
            type: String,
            default: ''
        },
        darkImgUrl: {
            type: String,
            default: ''
        },
        surfaceImgs: {
            type: Array,
            default: function () { return [] }
        }
    },
    mounted() {
        this._id = this.Id;
        this.default_image = this.defaultImgName;
        this.default_image_url = this.defaultImgUrl;
        this.dark_image = this.darkImgName;
        this.dark_image_url = this.darkImgUrl;
        this.surfaces = deepClone(this.surfaceImgs);
    },
    computed: {
        uploadAdditionalData: function(){
            return {_token: Helper.getMeta('csrf-token')};
        }
    },
    methods: {
        onProgressDefault(event, file, fileList){
            this.defaultImageProgress = parseInt( Math.round( ( event.loaded * 100 ) / event.total ) );
        },
        onProgressDark(event, file, fileList){
            this.darkImageProgress = parseInt( Math.round( ( event.loaded * 100 ) / event.total ) );
        },
        handleMainImageSuccess(res, file){
            if (res.error){
                for(const c in res.error){
                    if (typeof res.error[c] === 'object'){
                        for (const d in res.error[c]){
                            if(typeof res.error[c][d] === 'string'){
                                this.$message.error(res.error[c][d]);
                            }
                        }
                    } else if(typeof res.error[c] === 'string'){
                        this.$message.error(res.error[c]);
                    }
                }
            } else if(res.data){
                this.default_image_url = URL.createObjectURL(file.raw);
                this.default_image = res.data.name;
                this.showDefaultImageProgress = false;
                this.defaultImageProgress = 0;
                this.$message.success('Image uploaded successfully.');
                this.emitOnUpload();
            }
        },
        beforeMainImageUpload(file){
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';


            if (!isJPG && !isPNG) {
                this.$message.error('Avatar picture must be JPG OR PNG format!1');
                return false;
            }

            if (isJPG || isPNG){
                this.showDefaultImageProgress = true;
            }
            return isJPG || isPNG;
        },
        onDeleteDefaultImage(){
            const self = this;
            this.$confirm('Are you sure to delete this image?')
                .then(_ => {
                    self.default_image_url = '';
                    self.default_image = '';
                    self.emitOnUpload();
                })
                .catch(_ => {});
        },


        handleDarkImageSuccess(res, file){
            if (res.error){
                for(const c in res.error){
                    if (typeof res.error[c] === 'object'){
                        for (const d in res.error[c]){
                            if(typeof res.error[c][d] === 'string'){
                                this.$message.error(res.error[c][d]);
                            }
                        }
                    } else if(typeof res.error[c] === 'string'){
                        this.$message.error(res.error[c]);
                    }
                }
            } else if(res.data){
                this.dark_image_url = URL.createObjectURL(file.raw);
                this.dark_image = res.data.name;
                this.showDarkImageProgress = false;
                this.darkImageProgress = 0;
                this.$message.success('Image uploaded successfully.');
                this.emitOnUpload();
            }
        },
        beforeDarkImageUpload(file){
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';


            if (!isJPG && !isPNG) {
                this.$message.error('Avatar picture must be JPG OR PNG format!1');
                return false;
            }

            if (isJPG || isPNG){
                this.showDarkImageProgress = true;
            }

            return isJPG || isPNG;
        },
        onDeleteDarkImage(){
            const self = this;
            this.$confirm('Are you sure to delete this image?')
                .then(_ => {
                    self.dark_image = '';
                    self.dark_image_url = '';
                    self.emitOnUpload();
                })
                .catch(_ => {});
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

        handleRemoveSurfaceImage(file, fileList){
            if (file.response && file.response.data){
                const index = this.surfaces.indexOf(file.response.data);
                if (index !== -1){
                    this.surfaces.splice(index,1);
                }
            } else {
                const index = this.surfaceImgs.indexOf(file);
                if (index !== -1){
                    this.surfaces.splice(index,1);
                }
            }
            this.emitOnUpload();
        },
        handleSurfaceImagesSuccess(res, file, fileList){
            if (res.error){
                for(const c in res.error){
                    if (typeof res.error[c] === 'object'){
                        for (const d in res.error[c]){
                            if(typeof res.error[c][d] === 'string'){
                                this.$message.error(res.error[c][d]);
                            }
                        }
                    } else if(typeof res.error[c] === 'string'){
                        this.$message.error(res.error[c]);
                    }
                }
            } else if(res.data){
                this.surfaces_tmp.push(res.data);
                this.$message.success('Image uploaded successfully.');
                if (this.surfaces_tmp.length === fileList.length){
                    this.surfaces = deepClone(this.surfaces_tmp);
                    this.emitOnUpload();
                }
            }
        },
        emitOnUpload(){
            this.$emit('onUploadImage', {
                id: this._id,
                default_image: this.default_image,
                default_image_url: this.default_image_url,
                dark_image: this.dark_image,
                dark_image_url: this.dark_image_url,
                surfaces: this.surfaces,
            });
        }
    }
}
</script>
<style>
    .el-upload--picture-card{
        width: 98px;
        height: 98px;
        line-height: 96px;
    }
    .el-upload-list--picture-card .el-upload-list__item{
        width: 98px;
        height: 98px;
    }
    .el-upload--picture-card{
        background: none;
    }
    .el-form-item--label-top .el-form-item__label {
        width: auto!important;
        float: none;
        display: inline-block;
        text-align: left;
        padding: 0;
        line-height: 22px;
    }

    .el-form-item--label-top .el-form-item__content {
        margin-left: 0!important;
    }
    .form-action .el-form-item__content{
        margin: 0 !important;
        text-align: center;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
