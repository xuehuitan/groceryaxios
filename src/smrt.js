import {Line} from 'vue-chartjs'
import axios from 'axios'

export default{
    extends:Line,
    data: () => ({
        results:[],
        chartdata: {
          labels:[],
          datasets: [],
          mrt:
            {
              label: '',
              data:[],
              borderWidth:0.5,
              borderColor:"purple",
              backgroundColor:'purple',
              fill:false
            },
            lrt: {
              label: '',
              data:[],
              borderWidth:0.5,
              borderColor:"blue",
              backgroundColor:'blue',
              fill:false
            },
            bus: {
              label: '',
              data:[],
              borderWidth:0.5,
              borderColor:"orange",
              backgroundColor:'orange',
              fill:false
            },
            taxi: {
              label: '',
              data:[],
              borderWidth:0.5,
              borderColor:"pink",
              backgroundColor:'pink',
              fill:false
            },
        },
        options: {
            title: {
                display: true,
                text: 'Public Transport Ridership in Singapore'
            },
            legend: {
                display: true,
            },
            responsive: true,
            maintainAspectRatio: false,
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }
                }]
            }
        }
      }),
    methods:{
    fetchData : function(){
        axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=552b8662-3cbc-48c0-9fbb-abdc07fb377a').then(response=>{
        this.results=response.data.result.records
        let labels = []
        for(var i=0; i < this.results.length; i++){ //list of dictionaries
            if (this.results[i].type_of_public_transport == 'MRT') {
                this.chartdata.mrt.data.push(this.results[i].average_ridership)
                this.chartdata.mrt.label = this.results[i].type_of_public_transport
            } else if (this.results[i].type_of_public_transport == 'Taxi') {
                this.chartdata.taxi.data.push(this.results[i].average_ridership)
                this.chartdata.taxi.label = this.results[i].type_of_public_transport
            } else if (this.results[i].type_of_public_transport == 'LRT') {
                this.chartdata.lrt.data.push(this.results[i].average_ridership)
                this.chartdata.lrt.label = this.results[i].type_of_public_transport
            } else { //bus
                this.chartdata.bus.data.push(this.results[i].average_ridership)
                this.chartdata.bus.label = this.results[i].type_of_public_transport // + " (" + this.results[i].type_of_public_transport + ")"
            }
            labels.push(this.results[i].year)
        }
        this.chartdata.labels = [...new Set(labels)]
        this.chartdata.datasets.push(this.chartdata.mrt)
        this.chartdata.datasets.push(this.chartdata.taxi)
        this.chartdata.datasets.push(this.chartdata.lrt)
        this.chartdata.datasets.push(this.chartdata.bus)
        this.renderChart(this.chartdata,this.options)
    })
    }
    },
     mounted(){
        this.fetchData()
     }
}