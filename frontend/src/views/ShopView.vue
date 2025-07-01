    <template>

      <div v-if="getAll" class="allProducts">
        <div v-for="data in get_data" class="products">
          <img :src="data.img" class="image">
          <div class="info">
            <p>{{data.title}}</p>
          </div>
          <div></div>
        </div>
        
      </div>
      <div v-if="updateForm" class="updateFormOverlay" @click="closeUpdate()">
        <div class="updateFormDiv" @click.stop>
            <div id="updateFormDiv1">
              <p>Update Product</p>
              <button class="Xbutton" @click="closeUpdate()"><i class="bi bi-x-lg"></i></button>
            </div>
            <div id="updateFormDiv2">
                <div class="updateField">
                    <div style="width:70px;">Title:</div>
                    <input v-model="titletext" placeholder="Add text ...">                    
                </div>
                <div class="updateField"> 
                    <div style="width:70px;">Image:</div>
                    <input v-model="imgtext" placeholder="Add text ...">
                </div>
            </div>
            <button class="Submit" @click="update_product()">Sumbit</button>
        </div>
      </div>

    </template>

  <script>
    export default {
      data() {
        return {
          url: `http://localhost:5000/products/`,
          get_url: `http://localhost:5000/products/allUsers`,
          getAll: false,  
          get_data: [],      
          updateForm: false,
          titletext: '',
          imgtext: '',
          current_id: 0,
        };
      },
      methods: {
        async delete_product(id) {
          try {
            const response = await fetch(`${this.get_url}/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              }

            );
            if (!response.ok) {
              const errorText = await response.text(); // Get the backend error message
              console.error("Server responded with an error:", errorText);
              // Optional: alert or display to user
              return;
            }
            location.reload(); 
          
          } catch (error) {
            console.error(error.message)
          }

        },
        async update_modal(id) {
            this.current_id = id;
            console.log("update")
            this.updateForm = true;
        },
        closeUpdate() {
          this.updateForm = false;
        },
        async update_product() {
          let productdata = {}
          if (this.imgtext) productdata.img = this.imgtext
          if (this.titletext) productdata.title = this.titletext
          try {
            const response = await fetch(`${this.get_url}/${this.current_id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(productdata)  
            });
            location.reload();
          } catch (error) {
            console.error(error.message)
          }
          
        }
      },
      async mounted() {
        try {
          const response = await fetch(this.get_url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }

          const json = await response.json();
          console.log(json);
          this.getAll = true;
          this.get_data = json

        } catch (error) {
          console.log("error")
          console.error(error.message);
        }

      }
    }

  </script>
  <style>
    .allProducts {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      
    }
    .products{
      border: 3px solid rgb(181, 120, 6);
      border-radius: 6px;
      width: 100px;
      height: 150px;
      margin: 10px;
      color:aliceblue;
      position: relative;

    }

    .image {
      width: 100%;
      height: 100px;
      object-fit: contain; /* ensures the entire image fits without distortion */
      margin-bottom: 10px;
      display: block;
    }

    .delete_button {
      position: absolute;
      top: -10px;
      right: -10px;
      color: red;
      background-color: black;
      border-radius: 5px;
      cursor: pointer;
    }
    .update_button {
      position: absolute;
      bottom: -10px;
      right: -10px;
      color: greenyellow;
      background-color: black;
      border-radius: 5px;
      cursor: pointer;
    }
    .info {
      margin:6px;   
      display: flex;
      justify-content: center;
    }
    .updateFormOverlay {
      background-color: gray;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

    }
    .updateFormDiv {
      background-color: white;
      width: 30%;
      height: 30%;
      padding: 7px;
    }
    #updateFormDiv1 {
      display: flex;
      justify-content: space-between;
    }
    .updateField {
      display: flex;
      justify-content: row;
    }
  </style>
