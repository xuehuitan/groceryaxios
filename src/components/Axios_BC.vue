<template>
    <div id="main">
        <div id="chart">
            <axiosExample></axiosExample>

        </div>
         <div id="chart">
            <PSIIndex></PSIIndex>

        </div>

        <div id="chart">
            <covid></covid>
        </div>

        <div id="chart">
            <smrt></smrt>
        </div>
    </div>
</template>

<script>
import axiosExample from '../axiosExample.js'
import PSIIndex from '../PSIIndex.js'
import covid from '../covid.js'
import smrt from '../smrt.js'

export default {
    components:{
        axiosExample,PSIIndex,covid,smrt
    }
}
</script>>
<style scoped>
#main{
    content:"";
    display:table;
    clear:both;
    transform: scale(0.9)
}
#chart{
  height:350px;
  width:340px;
  border-style: solid;
  border-color:rgb(155, 84, 84);
  border-width: 1px;
  padding-bottom: 60px;
  float:left;
}
</style>