<template>
    <div class="settingTest">
        <label for="">{{ configName }}</label>
        <input type="checkbox" name="regression" v-model="this.regression" @change="changeConfigValue()"/>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { configRegresstion } from '@/utils/contains.js';
export default {
    name: "configItem",
    props: {
        configName: String,
        isCheck: Boolean
    },
    data(props) {
        let regression = props.isCheck;
        return {
            regression
        }
    },
    watch: {
        isCheck: function (newData) {
            this.regression = newData;
        },
    },
    methods:{
        ...mapActions(['updateConfig']),
        changeConfigValue() {
            if (this.regression == false) {
                let config = {
                    configName: configRegresstion.configName,
                    configValue: configRegresstion.configValueNo
                }
                this.updateConfig(config);
            } else if (this.regression == true) {
                let config = {
                    configName: configRegresstion.configName,
                    configValue: configRegresstion.configValueYes
                }
                this.updateConfig(config);
            }
        }
    }
}
</script>
<style>
.settingTest {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    font-weight: 500;
    border-bottom: 1px solid gray;
    margin-top: 20px;
}
</style>