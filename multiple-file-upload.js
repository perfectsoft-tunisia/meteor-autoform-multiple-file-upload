
import {Template} from 'meteor/templating';
import {upload_files} from 's3up/client';
import {ReactiveVar} from 'meteor/reactive-var';
import Dropzone from 'dropzone';

let listFiles = [];

Template.afMultipleFileUpload.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);   
    this.errorUpload = new ReactiveVar(false);  
    this.linkImage = new ReactiveVar();   
});

Template.afMultipleFileUpload.helpers({
    currentUpload() {
        return Template.instance().currentUpload.get();
    },
    errorUpload() {
        return Template.instance().errorUpload.get();
    },
    schemaKey() {
        if (this.atts) {
            return this.atts['data-schema-key'];
        }
    },
    linkImage() {
        return Template.instance().linkImage.get();
    },
    existImage() {
        const newImage = Template.instance().linkImage.get();
        if (newImage) {
            return newImage;
        } else {
            return this.value;
        }
    }
});

Template.afMultipleFileUpload.onRendered(function() {
    this.dropzone = new Dropzone('#uploadFile', {
        autoDiscover: false,
        autoProcessQueue: false,
        uploadMultiple: true,
        clickable: '#uploadFile .uploadButton',
        url() {
            return 'https://fakeurl.com'
        }, 
        addedfile: (file) => {
            let type = file.type.split('/')[0];
            if (type == 'image') {
                this.errorUpload.set(false);
                upload_files([file], {
                    authorizer: Meteor.call.bind(this, 'authorize_upload'),
                    upload_event: (err, res) => {
                        this.currentUpload.set(true);
                        if (err) {
                            this.errorUpload.set(err.reason);
                        }
                        $('#loading').progress({
                            percent: res.total_percent_uploaded
                        });
                        if (res.status == 'complete') {
                            listFiles.push(res.secure_url);
                            this.linkImage.set(listFiles);
                            this.currentUpload.set(false);
                        }
                    },
                    encoding: 'base64',
                });
            } else {
                this.errorUpload.set(`Type of file (${file.name}) is not an image`);
            }
        },
    })
});

Template.afMultipleFileUpload.onDestroyed(function() {
    if(this.dropzone) {
        this.dropzone.destroy();
        this.dropzone = null;
    }
})