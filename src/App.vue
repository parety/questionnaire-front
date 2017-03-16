<template>
    <div id="container">
        <v-header></v-header>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header';

export default {
    data() {
        return {
        };
    },
    components: {
        'v-header': header
    }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
#container
    width : 960px
    min-height : 1000px
    margin : 0 auto 
    padding-bottom : 100px
    background : #efefef
    font-size : 14px
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif
    color : #747474
</style>
