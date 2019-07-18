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
