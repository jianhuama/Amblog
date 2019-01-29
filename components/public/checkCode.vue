<template>
  <div @click="createRadom" class="codeStyle">
    {{str}}
  </div>
</template>

<script>
  export default {
    name: "checkedCode",
    data() {
      return {
        str: '',
        result: 0
      }
    },
    mounted() {
      this.createRadom();
    },
    methods: {
      createRadom() {
        let action = ['+', '-'];
        let actionIndex = this.getIndex(action.length);
        let firstNumber = this.getIndex(10);
        let toNumber = this.getIndex(10);

        let result = 0;
        if (action[actionIndex] === '+') {
          result = firstNumber + toNumber;
        } else {
          result = firstNumber - toNumber;
        }
        this.result = result;
        this.str = firstNumber + ' ' + action[actionIndex] + ' ' + toNumber + ' = ?';
      },
      getIndex(length) {
        return Math.round(Math.random() * (length - 1));
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .codeStyle
    font-size: 15px
    color: #409EFF
    cursor:pointer
    display: inline-block
</style>
