<template>
  <div>
    <div v-if="loadingPage" class="text-xs-center">
      <v-container text-xs-center fluid grid-list-md>
        <v-dialog v-model="loadingPage" persistent hide-overlay width="300px">
          <v-card color="primary" dark>
            <v-card-text>
              Please stand by
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
    </div>
  
    <v-container v-else class="body" fluid grid-list-md>
      <div v-if="alert.status">
        <v-alert v-model="alert.status" :type="alert.type" dismissible>{{alert.message}}</v-alert>
      </div>
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <FormProduct :Product="product" :Title="title"></FormProduct>
              <div class="botton-submit text-md-center">
                <v-btn round class="blueyPurpleBackground whiteColor" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save">
                  <v-icon left>save</v-icon> Save</v-btn>
                <v-btn round class="lightBlueGreyBackground blueyPurpleColor" @click.prevent="saveNew" :loading="loadingBtnSave2" :disabled="loadingBtnSave2">
                  <v-icon left>save</v-icon> Save & New</v-btn>
                <v-btn round class="lightBlueGreyBackground blueyPurpleColor" @click="cancel">
                  <v-icon left>cancel</v-icon> Cancel</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-card-text class="text-xs-center pa-0 grey lighten-1">
            <v-layout class="backToList" justify-center row wrap>
              <router-link to="/product">
                <v-subheader>
                  <v-icon color="#6747cd">mdi-chevron-left-circle-outline</v-icon>
                  Back to List
                </v-subheader>
              </router-link>
            </v-layout>
          </v-card-text>
        </v-flex>
      </v-layout>
  
    </v-container>
  </div>
</template>

<style scoped>
  .body {
    background-color: #f2f2f2;
  }
</style>

<script>
  import FormProduct from "@/components/product/Form";
  import {
    CREATE_PRODUCT,
    GET_UNIT
  } from "@/store/actions.type";
  import _ from "underscore";
  
  export default {
    components: {
      FormProduct
    },
    data() {
      return {
        loadingPage: true,
        title: "Create a New Product",
        alert: {
          status: false,
          type: "success",
          message: ""
        },
        loadingBtnSave: false,
        loadingBtnSave2: false,
        // product: {}
        product: {
          ListProductUnit: [{
              Name: "",
              ReceiptName: "",
              Description: "",
              Image: "",
              Barcode: "",
              Conversion: 1,
              UnitId: "",
              UnitName: ""
            },
            {
              Name: "",
              ReceiptName: "",
              Description: "",
              Image: "",
              Barcode: "",
              Conversion: 0,
              UnitId: "",
              UnitName: ""
            },
            {
              Name: "",
              ReceiptName: "",
              Description: "",
              Image: "",
              Barcode: "",
              Conversion: 0,
              UnitId: "",
              UnitName: ""
            }
          ],
          Name: "",
          SKU: "",
          Description: "",
          Size: "",
          PurchasePrice: 0,
          DefaultPrice: 0,
          IsAllowMinus: false,
          DepartmentId: "",
          BrandId: "",
          ProductCategoryId: "",
          TaxId: "",
          UnitId: "",
          Conversion2: 0,
          Conversion3: 0,
          ListProductSupplierItem:[]
        }
      };
    },
    methods: {
      cancel() {
        this.$refs.form.reset();
      },
      save() {
        const backupListProductUnit = this.product.ListProductUnit;
        const reject = _.reject(this.product.ListProductUnit, o => {
          return o.UnitId == "";
        });
        this.product.ListProductUnit = reject;
        if (this.$refs.form.validate()) {
          this.alert.status = false;
          this.loadingBtnSave = true;
          this.$store.dispatch(CREATE_PRODUCT, this.product)
            .then(response => {
              this.alert = {
                status: true,
                type: "success",
                message: "Data is submited."
              };
              this.$router.push({
                path: "/product"
              });
            })
            .catch(err => {
              console.log("gagal");
              this.alert = {
                status: true,
                type: "error",
                message: err.message
              };
              this.loadingBtnSave = false;
            });
        } else {
          this.product.ListProductUnit = backupListProductUnit;
        }
      },
      saveNew(event) {
        if (this.$refs.form.validate()) {
          this.alert.status = false;
          this.loadingBtnSave2 = true;
          this.$store
            .dispatch(CREATE_PRODUCT, this.product)
            .then(response => {
              this.alert = {
                status: true,
                type: "success",
                message: "Data is submited."
              };
              this.$refs.form.reset();
              this.loadingBtnSave2 = false;
            })
            .catch(err => {
              console.log(err);
              console.log("gagal");
              this.alert = {
                status: true,
                type: "error",
                message: err.message
              };
              this.loadingBtnSave2 = false;
            });
        }
      }
    },
    async created() {
      await this.$store.dispatch("GET_PRODUCTCATEGORY_OF_PRODUCT");
      await this.$store.dispatch("GET_BRAND_OF_PRODUCT");
      await this.$store.dispatch("GET_DEPARTMENT_OF_PRODUCT");
      await this.$store.dispatch("GET_TAX_OF_PRODUCT");
      await this.$store.dispatch("GET_UNIT_OF_PRODUCT");
      this.loadingPage = false;
    }
  };
</script>
