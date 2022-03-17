<template>
     <div class="row">
      <div class="col-sm-1">
      </div>
      <div class="col-sm-7 ml-5 ">
        <h3 class="borderItem mt-5 mb-5">Insert user</h3>
        <div class="mb-4">
          <form action="" method="post">
            <div class="form-group">
              <label for="">Email: </label>
              <input type="text" name="" id="" class="form-control" placeholder="Enter your email"
                aria-describedby="helpId">
            </div>
            <div class="form-group">
              <label for="">User name: </label>
              <input type="text" name="" id="" class="form-control" placeholder="Enter user name"
                aria-describedby="helpId">
            </div>
            <div class="form-group">
              <label for="">Password: </label>
              <input type="password" name="" id="" class="form-control" placeholder="Enter your password"
                aria-describedby="helpId">
            </div>
            <div class="form-group">
              <label for="">Enter the password again: </label>
              <input type="password" class="form-control" name="" id="" placeholder="Enter the password agains"
                aria-describedby="helpId">
            </div>
            <div class="form-group">
              <label for="">Permission: </label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Select permission</option>
                <option value="admin">Admin</option>
                <option value="tester">Tester</option>
                <option value="user">User</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Add user</button>
          </form>
        </div>
      </div>

    </div>
</template>
<script>
export default {
    setup() {
        
    },
}
</script>
<style lang="css">
    
</style>