<template>
  <div class="row">
    <div class="col-sm-1">
    </div>
    <div class="col-sm-7 ml-5 ">
      <h3 class="borderItem mt-5 mb-5">Insert user</h3>
      <div class="mb-4">
          <div v-if="message" :class="`alert ${type}`">{{message}}</div>
        <form action="" method="post" @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="">Email: </label>
            <input type="text" name="email" id="email" class="form-control" placeholder="Enter your email"
              aria-describedby="helpId" v-model="email">
            <span v-if="v$.email.$error" class="text-danger">
              <span v-for="item in v$.email.$errors" :key="item.id" style="display:block">
                <i>{{ item.$message }}</i>
              </span><br>
            </span>
          </div>
          <div class="form-group">
            <label for="">User name: </label>
            <input type="text" name="username" id="username" class="form-control" placeholder="Enter user name"
              aria-describedby="helpId" v-model="username">
            <span v-if="v$.username.$error" class="text-danger">
              <span v-for="item in v$.username.$errors" :key="item.id" style="display:block">
                <i>{{ item.$message }}</i>
              </span><br>
            </span>
          </div>
          <div class="form-group">
            <label for="">Password: </label>
            <input type="password" name="password" id="password" class="form-control" placeholder="Enter your password"
              aria-describedby="helpId" v-model="password.password">
            <span v-if="v$.password.password.$error" class="text-danger">
              <span v-for="item in v$.password.password.$errors" :key="item.id" style="display:block">
                <i>{{ item.$message }}</i>
              </span><br>
            </span>
          </div>
          <div class="form-group">
            <label for="">Enter the password again: </label>
            <input type="password" class="form-control" name="passwordconformen" id="passwordconformen"
              placeholder="Enter the password agains" aria-describedby="helpId" v-model="password.confirm">
            <span v-if="v$.password.confirm.$error" class="text-danger">
              <span v-for="item in v$.password.confirm.$errors" :key="item.id" style="display:block">
                <i>{{ item.$message }}</i>
              </span><br>
            </span>
          </div>
          <div class="form-group">
            <label for="">Roles: </label>
            <div class="permission">
              <input type="checkbox" id="Admin" value="ADMIN" v-model="roles">
              <label for="Admin">&ensp;Admin</label>
              <br>
              <input type="checkbox" id="User" value="USER" v-model="roles">
              <label for="User">&ensp;User</label>
              <br>
              <input type="checkbox" id="Manager" value="MANAGER" v-model="roles">
              <label for="Manager">&ensp;Manager</label>
              <br>
            </div>
            <span v-if="v$.roles.$error" class="text-danger">
              <span v-for="item in v$.roles.$errors" :key="item.id" style="display:block">
                <i>{{ item.$message }}</i>
              </span><br>
            </span>
          </div>
          <button type="submit" class="btn btn-primary">Add user</button>
        </form>
      </div>
    </div>

  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, minLength, email, sameAs } from "@vuelidate/validators";
import { mapActions,mapGetters} from "vuex";
export default {
  setup() { },
  computed:mapGetters(["type","message"]),
  data() {
    return {
      v$: useValidate(),
      email: "",
      username: "",
      password: {
        password: "",
        confirm: ""
      },
      permission: [],
      roles: []
    };
  },
  validations() {
    return {
      username: {
        required,
        minLength: minLength(7)
      },
      email: {
        required,
        email
      },
      password: {
        password: {
          required,
          minLength: minLength(7)
        },
        confirm: {
          required,
          minLength: minLength(7),
          sameAs: sameAs(this.password.password)
        }
      },
      roles: {
        required
      }
    };
  },
  methods: {
    ...mapActions(["addUser"]),
    onSubmit() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        let rolesArray = JSON.parse(JSON.stringify(this.roles));
        let roles = this.getRoles(rolesArray);
        const userNew = {
          username: this.username,
          password: this.password.password,
          email: this.email,
          permissions:  roles,
          roles: roles
        };
        this.addUser(userNew);
        console.log(userNew);
      }
    },
    getRoles(roles) {
      let rolesString = "";
      roles.forEach(element => {
        console.log(element);
        rolesString += element+",";
      });
      let index = rolesString.lastIndexOf("\\,");
      console.log(index);
      if(index != -1){
        rolesString = rolesString.slice(0,index-1);
      }
      return rolesString;
    }
  },
};
</script>
<style lang="css">
.permission {
  margin-left: 2%
}
</style>