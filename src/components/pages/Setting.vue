<template>
    <div>
        <div class="col-sm-2 titleLeft mb-3">
            <h1 class="title">Settings</h1>
        </div>
        <div class="mt-4 settingMain">
            <div v-if="message" :class="`alert ${type}`">
                <strong>{{ message }}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span class="alertClose" aria-hidden="true" @onclick="closeAlert()">&times;</span>
                </button>
            </div>
            <configItem configName="Regression test" :isCheck="configRegressValue" />
            <configItem configName="Insert script test" :isCheck="false" />
        </div>
    </div>
</template>
<script>
import { mapGetters, useStore, mapActions } from 'vuex';
import { configRegresstion } from '@/utils/Contains.js'
import configItem from '../Item/ConfigItem.vue';
export default {
    name: "regresstionTest",
    components: {
        configItem
    },
    data() {
        const store = useStore();
        store.dispatch('getConfig', configRegresstion.configName);
        return {
            store
        }
    },
    computed: mapGetters(["type", "message", "configRegressValue"]),
    methods: {
        ...mapActions(['clear']),
        closeAlert() {
            this.clear();
        }
    }
}
</script>
<style>
.title {
    font-family: monospace;
}

.titleLeft {
    border-bottom: 2px solid gray;
    margin-bottom: 4% !important;
}

.settingMain {
    margin: auto;
    width: 900px;
}
</style>
