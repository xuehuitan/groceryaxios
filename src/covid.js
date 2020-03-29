import {Bar} from 'vue-chartjs'
import axios from 'axios'

export default{
    extends:Bar,
    data: () => ({
        results:[],
        chartdata: {
          labels:[],
          datasets: [],
          contracted:
            {
              label: '',
              data:[], // to contain the values
              borderWidth:0.5,
              borderColor:"cyan",
              backgroundColor:'cyan',
            },
          recovered:
          {
            label: '',
            data:[], // to contain the values
            borderWidth:0.5,
            borderColor:"purple",
            backgroundColor:"purple",
          },
          deaths:
          {
            label: '',
            data:[], // to contain the values
            borderWidth:0.5,
            borderColor:"orange",
            backgroundColor:"orange",
          }
        },
        options: {
          title: {
            display: true,
            text: 'US COV-ID Cases 2020',
          },
          legend: {
            display: true
          }
        }
      }),
    methods:{
      indexWhere: function(array, conditionFn) {
        const item = array.find(conditionFn)
        return array.indexOf(item)
      },
      fetchData : function(){
        axios.get('https://covid19.soficoop.com/country/us').then(response=>{
        this.results=response.data.snapshots
        let dates = []
        // get unique dates
        for(var i=0; i < this.results.length; i++){ //list of dictionaries
          dates.push(this.results[i].timestamp.substr(0, 10))
        }
        dates = [...new Set(dates)]
        for(var j=0; j < dates.length; j++) { // each unique date
          const index = this.indexWhere(this.results, item => item.timestamp.substr(0, 10) == dates[j])
          this.chartdata.contracted.data.push(this.results[index].cases)
          this.chartdata.contracted.label = "Cases"
          this.chartdata.recovered.data.push(this.results[index].recovered)
          this.chartdata.recovered.label = "Recovered"
          this.chartdata.deaths.data.push(this.results[index].deaths)
          this.chartdata.deaths.label = "Death"
        }
        this.chartdata.datasets.push(this.chartdata.contracted)
        this.chartdata.datasets.push(this.chartdata.recovered)
        this.chartdata.datasets.push(this.chartdata.deaths)
        this.chartdata.labels = dates
        this.renderChart(this.chartdata, this.options)
    })
    }
    },
     mounted(){
        this.fetchData()
     }
}