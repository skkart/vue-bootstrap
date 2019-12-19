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
