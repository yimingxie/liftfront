<template>
  <div id="DetTest">
    <el-form :model="dynamicValidateForm" :rules="rules" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item prop="regCode" class="lar-box">
        <h4>电梯注册代码</h4>
        <el-input v-model="dynamicValidateForm.regCode" size="small"></el-input>
      </el-form-item>


      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input v-model="dynamicValidateForm.email"></el-input>
      </el-form-item>

      
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'域名' + index"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true, message: '域名不能为空', trigger: 'blur'
        }"
      >
        <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增域名</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <div>
      <input type="file" id="uploadFile">
    </div>
    <div>
      <button @click="submitFile">提交</button>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        rules: {
          regCode: [{ required: true, message: '必填', trigger: 'blur' }],
          areaCode: [{ required: true, message: '必填', trigger: 'blur' }],
        },
        dynamicValidateForm: {
          domains: [{
            value: '',
            value2: ''
          }],
          email: ''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      },

      submitFile() {
        var formData = new FormData();
        
        console.log('uploadFile', document.getElementById("uploadFile").files[0])
        formData.append('picture', document.getElementById("uploadFile").files[0])
        console.log('formData', formData)
      },
    }
  }
</script>

<style lang="stylus" scoped>
#DetTest{
  
  
}

</style>
