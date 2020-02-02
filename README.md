# vue-bootstrap
Basic integration of the Bootstrap v4 component for Vue.js

## Example

### Directives
#### Toolip
```vue
<span v-tooltip="{title: "Hello Tooltip", hide: false}"
      data-placement="top"> Tooltip </span>

```

#### Popover
```vue
<span v-popover="#popover"
   data-container="body"
   data-trigger="hover focus" data-placement="top" > Popover </span>

```
#### DateRange pickerOptions
```Vue
<template>
    <div class="input-group input-group-sm">
        <input autocomplete="off" v-bootstrap-date-range="{onDateSubmit: onDateSubmit, pickerOptions: this.pickerOptions}" type="text" name="date-range" class="form-control" />
    </div>
</template>

<script>
  import directivesDateRange from 'vue-bootstrap'
  import moment from 'moment-timezone'

  export default {
    name: 'page',
    // this section is important to import directive
    directives: {
      'bootstrap-date-range': directivesDateRange
    },
    data () {
      return {
        showAppBox: false,
        pickerOptions () {
          let ranges = this.latestRange()

          const minDate = moment().subtract(2, 'years')
          const startDate = moment().subtract(3, 'months')
          const endDate = moment().subtract(1, 'months')
          const format = 'MM/DD/YYYY HH:mm'

          return {
            // Here goes all the options for bootstrap-date-range
            startDate,
            endDate,
            ranges,
            minDate,
            maxDate: moment(),
            locale: {
              format,
              applyLabel: 'OK'
            },
          }
        }
      }
    },
    methods: {
      latestRange () {
        let rangeOpts = {
          'Last 1 Hour': [moment().subtract(1, 'hour'), moment()],
          'Last 4 Hours': [moment().subtract(4, 'hours'), moment()],
          'Last 24 Hours': [moment().subtract(24, 'hours'), moment()],
          'Last 7 Days': [moment().subtract(7, 'days'), moment()],
          'Last Month': [moment().subtract(1, 'months').startOf('Month'), moment().subtract(1, 'months').endOf('Month')],
          'Current Month': [moment().startOf('Month'), moment()]
        }
        return rangeOpts
      },
      onDateSubmit (sD, eD, opStr) {
        console.log(sD, eD, opStr)
      }
    }
  }
</script>

```


### Components
#### AppBootstrapDatepicker
``` vue
<template>
    <app-bootstrap-datepicker v-model="date" :pickerOptions="timeOptions" @input="timeChange"/>
</template>


<script>
  import AppBootstrapDatepicker from 'vue-bootstrap'

  export default {
    name: 'page',
    components: {
      AppBootstrapDatepicker
    },
    data () {
      return {
        date: null,
        timeOptions: {
          // Pass all bootstrap datepicker options
          format: 'dd/mm/yyyy',
          todayHighlight: true,
          endDate: new Date()
        }
      }
    },
    methods: {
      timeChange (...args) {
        console.log('timeChange', ...args)
      }
    }
  }
</script>
```

#### AppBootstrapSelect
``` vue
<template>
    <app-bootstrap-select
            :value="selectVal"
            :items="dropBoxList"
            :pickerOptions="selectOptions"
            :hideNoneSelectedText="true"
            @input="onSelectChange"/>
</template>


<script>
  import AppBootstrapSelect from 'vue-bootstrap'

  export default {
    name: 'page',
    components: {
      AppBootstrapSelect
    },
    data () {
      return {
        selectVal: null,
        dropBoxList: [{label: 'Hello', value: 1}, {label: 'Bye', value: 0}],
        selectOptions: {
          // Pass all bootstrap select options
          style: 'selector-btn',
          liveSearch: true,
          showSubtext: true,
          size: 20,
          liveSearchPlaceholder: 'Search',
          noneSelectedText: 'None'
        }
      }
    },
    methods: {
      onSelectChange (val, obj) {
        console.log('Select', val, obj)
      }
    }
  }
</script>
```

#### AppModal
```vue
<template>
    <app-modal style="max-height: 40%; overflow-y: visible"
               v-if="showAppBox"
               :hasConfirm="true"
               @close="showAppBox = false"
               @confirm="console.log('App Model Submitted')">
        <template slot="header">
            <div>App Header</div>
        </template>
        <template slot="body">
            <div>
                App Body
            </div>
        </template>
    </app-modal>
    <button @click="showAppBox = true"> Show App Model </button>
</template>


<script>
  import AppModal from 'vue-bootstrap'

  export default {
    name: 'page',
    components: {
      AppModal
    },
    data () {
      return {
        showAppBox: false,
      }
    }
  }
</script>
```
