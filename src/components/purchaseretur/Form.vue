<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs4>
        <v-layout row wrap>
          <v-flex xs8>
            <v-select label="Supplier"
            v-model="Purchase['SupplierId']" :items="$store.state.supplier.suppliers" item-text="Company" v-on:change="() => {myFunctionSupplier(), setDueDate()}" item-value="Id" :rules="true?[v => !!v || 'Supplier' + ' is required.']:[]" :required="true" autocomplete></v-select>
          </v-flex>
          <v-flex xs1>
            <v-btn class="success" fab small="" @click.stop="showDialogSupplier">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs4>
        <v-layout row wrap>
          <v-flex xs8>
            <v-select label="Warehouse" v-model="Purchase['WarehouseId']" :items="$store.state.warehouse.warehouses" item-text="Name" item-value="Id" :rules="true?[v => !!v || 'Warehouse' + ' is required.']:[]" :required="true" autocomplete></v-select>
          </v-flex>
          <v-flex xs1>
            <v-btn class="success" fab small="" @click.stop="showDialogWarehouse">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs8>
            <v-select label="Payment Term" v-model="Purchase['PaymentTermId']" v-on:change="() => {setDueDate()}" :items="$store.state.paymentterm.paymentterms" item-text="Name" item-value="Id" :rules="true?[v => !!v || 'Payment Term' + ' is required.']:[]" :required="true" autocomplete></v-select>
          </v-flex>
          <v-flex xs1>
            <v-btn class="success" fab small="" @click.stop="showDialogPaymentTerm">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs8>

            <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
              <v-text-field slot="activator" v-model="Purchase.DueDate" label="Due Date" readonly></v-text-field>
              <v-date-picker ref="picker" v-model="Purchase.DueDate" min="1950-01-01" @change="saveDueDate"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs4>
        <v-layout row wrap>
          <v-flex xs8>
            <v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
              <v-text-field slot="activator" v-model="Purchase.Date" label="Date" readonly></v-text-field>
              <v-date-picker ref="picker" v-model="Purchase.Date" min="1950-01-01" @change="()=>{saveDate(); setDueDate() }"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs8>
            <v-text-field label="Invoice No" value="-" v-model="Purchase['InvoiceNo']" type="text" :rules="true?[v => !!v || 'Invoice No' + ' is required.']:[]" :required="true"></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-data-table :headers="headers" :items="Purchase.ListPurchaseItem" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">
          {{ props.index + 1 }}
        </td>
        <td class="text-xs-right">
          <v-select :items="$store.state.product.products" v-model="Purchase['ListPurchaseItem'][props.index].ProductId"  item-text="Name" v-on:change="myFunction(props.index)" item-value="Id" autocomplete></v-select>
        </td>
        <td class="text-xs-right">
          <v-text-field :value="Purchase['ListPurchaseItem'][props.index].ProductDescription" v-model="Purchase['ListPurchaseItem'][props.index].ProductDescription" name="description" id="description"></v-text-field>
        </td>
        <td class="text-xs-right">
          <v-text-field :value="Purchase['ListPurchaseItem'][props.index].ProductPrice" v-model="Purchase['ListPurchaseItem'][props.index].ProductPrice" name="price" id="price"></v-text-field>
        </td>
        <td class="text-xs-right">
          <v-text-field :value="Purchase['ListPurchaseItem'][props.index].Quantity" v-model="Purchase['ListPurchaseItem'][props.index].Quantity" name="quantity" id="quantity"></v-text-field>
        </td>
        <td>
          <v-layout row wrap>
            <v-flex xs7>
              <v-text-field  v-if="Purchase['ListPurchaseItem'][props.index].TipeDiscount == 'amount'" :value="Purchase['ListPurchaseItem'][props.index].DiscountAmount" v-model="Purchase['ListPurchaseItem'][props.index].DiscountAmount" name="discountAmount" id="discountAmount"></v-text-field>
              <v-text-field  v-else-if="Purchase['ListPurchaseItem'][props.index].TipeDiscount == 'percentage'" :value="Purchase['ListPurchaseItem'][props.index].DiscountPercentage" v-model="Purchase['ListPurchaseItem'][props.index].DiscountPercentage" name="discountPercentage" id="discountPercentage"></v-text-field>
            </v-flex>
            <v-flex xs5 :style="{ marginTop: '10px'}" >
              <v-btn-toggle v-model="Purchase['ListPurchaseItem'][props.index].ToggleDiscount">
                <v-btn :style="{ textTransform: 'none' }" flat v-on:click="changeTipeDiscount('amount', props.index)">
                  Rp.
                </v-btn>
                <v-btn flat v-on:click="changeTipeDiscount('percentage', props.index)">
                  %
                </v-btn>
              </v-btn-toggle>
            </v-flex>
          </v-layout>
        </td>
        <td>
          <v-layout row wrap>
            <v-flex xs7>
              <v-select v-model="Purchase['ListPurchaseItem'][props.index].Tax" :items="$store.state.tax.taxs" item-text="Name" item-value="Name" :rules="true?[v => !!v || 'Tax' + ' is required.']:[]" :required="true" autocomplete></v-select>
            </v-flex>
          </v-layout>
        </td>
        <td class="text-xs-right">
          <div class="subheading">
            {{ formatPrice(lineTotal(props.index)) }}
          </div>
      </td>
      <td class="text-xs-right">
        <v-btn color="error" @click="removeRow(props.index)">
          <v-icon>delete</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>

  <v-layout row>
    <v-flex xs12 sm12>
      <v-card-text>
        <div class="botton-submit text-md-right">
          <v-btn color="info" @click="addRow(Purchase.ListPurchaseItem.length)">Tambah List Item</v-btn>
        </div>
      </v-card-text>
    </v-flex>
  </v-layout>

  <v-layout row wrap>
    <v-flex xs7>
      <v-text-field
      label="Notes"
      name="notes"
      v-model="Purchase['Notes']"
      textarea
      box
      ></v-text-field>
    </v-flex>
    <v-flex xs5>
      <v-layout row wrap>
        <v-flex xs6>
          <v-card >
            <v-card-text>
              Sub Total
            </v-card-text>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs5>
                  <v-text-field v-if="Purchase.TipeDiscount == 'amount'" :value="Purchase.DiscountAmount" v-model="Purchase.DiscountAmount" name="discountAmount" label="0" id="discountAmount"></v-text-field>
                  <v-text-field v-if="Purchase.TipeDiscount == 'percentage'" :value="Purchase.DiscountPercentage" v-model="Purchase.DiscountPercentage" name="discountPercentage" label="%" id="discountPercentage"></v-text-field>
                </v-flex>
                <v-flex xs5 :style="{ marginTop: '10px'}" >
                  <v-btn-toggle v-model="Purchase.ToggleDiscount">
                    <v-btn :style="{ textTransform: 'none' }" flat v-on:click="changeTipeDiscountGrand('amount')">
                      Rp.
                    </v-btn>
                    <v-btn flat v-on:click="changeTipeDiscountGrand('percentage')">
                      %
                    </v-btn>
                  </v-btn-toggle>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs5>
                  Total Tax
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card>
            <v-card-text class="text-lg-right">
              {{ formatPrice(subTotall()) }}
            </v-card-text>
            <v-card-text :style="{ marginTop: '28px' }" class="text-lg-right">
              {{ formatPrice(grandDiscountt()) }}
            </v-card-text>
            <v-card-text :style="{ marginTop: '1px' }" class="text-lg-right">
              {{ formatPrice(grandTaxx()) }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-card dark color="green">
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs6 class="title">
              Total
            </v-flex>
            <v-flex xs6 class="text-lg-right title">
              Rp. {{ formatPrice(grandTotall()) }}
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>

  <FormDialogSupllier/>
  <FormDialogPaymentTerm/>
  <FormDialogWarehouse/>


</v-container>
</template>

<script>
import FormDialogSupllier from "@/components/supplier/FormDialog";
import moment from "moment";
import FormDialogPaymentTerm from "@/components/paymentterm/FormDialog";
import FormDialogWarehouse from "@/components/warehouse/FormDialog";
import {
  GET_PRODUCT,
  GET_SUPPLIER,
  GET_PAYMENTTERM
} from "../../store/actions.type.js";

export default {
  props: ['Purchase', "Retur"],
  components: {
    FormDialogSupllier,
    FormDialogPaymentTerm,
    FormDialogWarehouse
  },
  data() {
    return {
      test: "",
      subTotal: 0,
      TipeDiscount: "amount",
      toggle_discount: 0,
      grandTotal: 0,
      grandDiscount: 0,
      grandTax: 0,
      discountAmount: 0,
      discountPercentage: 0,
      date: null,
      menu: false,
      menu1: false,
      headers: [
        {
          text: "No.",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Product",
          value: "product"
        },
        {
          text: "Description",
          value: "description"
        },
        {
          text: "Price / Unit",
          value: "price"
        },
        {
          text: "Quantity",
          value: "quantity"
        },
        {
          text: "Discount",
          value: "discount"
        },
        {
          text: "Tax",
          value: "tax"
        },
        {
          text: "Line Total",
          value: "linetotal"
        },
        {
          text: "Action",
          value: "action"
        }
      ]
    };
  },
  computed: {
    testMoment: function() {
      return moment(new Date()).format("YYYY");
    }
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    grandDiscountt: function() {
      var da = this.Purchase.DiscountAmount;
      var dp = this.Purchase.DiscountPercentage;

      if (this.Purchase.TipeDiscount == "amount") {
        this.grandDiscount = da;
        return this.Purchase.DiscountAmount;
      } else if (this.Purchase.TipeDiscount == "percentage") {
        dp = this.Purchase.DiscountPercentage / 100 * this.Purchase.SubTotal;
        this.grandDiscount = dp;
        return dp;
      }
    },
    grandTaxx: function() {
      var t = 0;
      this.Purchase.ListPurchaseItem.reduce(function(total, item) {
        console.log(item, " di form purchase");
        if (item.Tax == "PPN") {
          total = total + item.LineTotal * (10 / 100);
        } else if (item.Tax == "NoPPN") {
          total = total + 0;
        }
        return (t = total);
      }, 0);
      this.Purchase.TaxAmount = t;
      return t;
    },
    grandTotall: function() {
      var tax = 0;
      if (this.Purchase.TipeDiscount == "percentage") {
        this.Purchase.TotalPurchase =
          this.Purchase.SubTotal - this.grandDiscount + this.Purchase.TaxAmount;
      } else if (this.Purchase.TipeDiscount == "amount") {
        this.Purchase.TotalPurchase =
          this.Purchase.SubTotal - this.grandDiscount + this.Purchase.TaxAmount;
      }
      return this.Purchase.TotalPurchase;
    },
    subTotall: function() {
      var t = 0;
      this.Purchase.ListPurchaseItem.reduce(function(total, item) {
        total = total + item.LineTotal;
        return (t = total);
      }, 0);
      this.Purchase.SubTotal = t;
      return t;
    },

    lineTotal(index) {
      var t = 0,
        total = 0;
      var quantity = 0,
        price = 0;
      var discountPercentage = this.Purchase.ListPurchaseItem[index]
          .DiscountPercentage,
        discountAmount = this.Purchase.ListPurchaseItem[index].DiscountAmount;
      quantity = this.Purchase.ListPurchaseItem[index].Quantity;
      price = this.Purchase.ListPurchaseItem[index].ProductPrice;
      total = price * quantity;
      discountPercentage = discountPercentage / 100 * total;

      if (this.Purchase.ListPurchaseItem[index].TipeDiscount == "amount") {
        t = total - discountAmount;
      } else if (
        this.Purchase.ListPurchaseItem[index].TipeDiscount == "percentage"
      ) {
        t = total - discountPercentage;
      }
      this.Purchase.ListPurchaseItem[index].LineTotal = t;
      return this.Purchase.ListPurchaseItem[index].LineTotal;
    },
    subTaxx: function() {
      var t = 0;
      this.Purchase.ListPurchaseItem.reduce(function(total, item) {
        total = total + item.tax;
        return (t = total);
      }, 0);
      this.grandTax = t;
      return t;
    },
    myFunction(index) {
      var test = index;
      var self = this;
      setTimeout(function(test) {
        self.$store
          .dispatch(
            GET_PRODUCT,
            self.Purchase.ListPurchaseItem[index].ProductId
          )
          .then(response => {
            self.Purchase.ListPurchaseItem[index].ProductDescription =
              response.data.Description;
            self.Purchase.ListPurchaseItem[index].ProductPrice =
              response.data.PurchasePrice;
            self.Purchase.ListPurchaseItem[index].ProductName =
              response.data.Name;
            self.Purchase.ListPurchaseItem[index].ProductSKU =
              response.data.SKU;
            self.Purchase.ListPurchaseItem[index].Tax = response.data.Tax.Name;
            self.Purchase.ListPurchaseItem[index].UnitId = response.data.UnitId;
          })
          .catch(err => {
            console.log("gagal");
          });
      }, 10);
    },
    myFunctionSupplier() {
      var self = this;
      setTimeout(function() {
        self.$store
          .dispatch(GET_SUPPLIER, self.Purchase.SupplierId)
          .then(response => {
            self.Purchase.PaymentTermId =
              self.$store.state.supplier.supplier.PaymentTermId;
          })
          .catch(err => {
            console.log("gagal");
          });
      }, 10);
    },
    changeTipeDiscount(tipe, index) {
      console.log(tipe);
      this.Purchase.ListPurchaseItem[index].TipeDiscount = tipe;
    },
    changeTipeTax(tipe, index) {
      this.Purchase.ListPurchaseItem[index].tipeTax = tipe;
    },
    changeTipeDiscountGrand(tipe) {
      this.Purchase.TipeDiscount = tipe;
    },
    changeTipeTaxGrand(tipe) {
      this.tipeTax = tipe;
    },
    saveDueDate(duedate) {
      this.$refs.menu.save(duedate);
    },

    saveDate(date) {
      this.$refs.menu1.save(date);
    },

    showDialogSupplier() {
      this.$store.state.supplier.dialogState = true;
    },

    showDialogPaymentTerm() {
      this.$store.state.paymentterm.dialogState = true;
    },

    showDialogWarehouse() {
      this.$store.state.warehouse.dialogState = true;
    },

    addRow: function(index) {
      try {
        this.Purchase.ListPurchaseItem.splice(index + 1, 0, {
          TipeDiscount: "amount",
          ToggleDiscount: 0,
          ProductId: "",
          ProductName: "",
          ProductDescription: "",
          ProductPrice: 0,
          ProductQuantity: 0,
          DiscountAmount: 0,
          DiscountPercentage: 0,
          Tax: 0,
          LineTotal: 0,
          Quantity: 0
        });
      } catch (e) {
        console.log(e);
      }
    },
    removeRow: function(index) {
      this.Purchase.ListPurchaseItem.splice(index, 1);
    },
    selectedItem: function(product) {
      console.log(product);
    },
    setToggleDiscount1: function() {
      console.log("test1");
      for (var i = 0; i < this.Purchase.ListPurchaseItem.length; i++) {
        if (this.Purchase.ListPurchaseItem[i].TipeDiscount == "amount") {
          this.Purchase.ListPurchaseItem[i].toggle_discount = 0;
        } else if (
          this.Purchase.ListPurchaseItem[i].TipeDiscount == "percentage"
        ) {
          this.Purchase.ListPurchaseItem[i].toggle_discount = 1;
        }
      }
    },
    setToggleDiscount2: function() {
      console.log("test2");
      if (this.Purchase.TipeDiscount == "amount") {
        this.Purchase.toggle_discount = 0;
      } else if (this.Purchase.TipeDiscount == "percentage") {
        this.Purchase.toggle_discount = 1;
      }
    },
    setDueDate: function() {
      console.log(new Date(), "tanggal");
      var self = this;
      setTimeout(function() {
        console.log(self.Purchase.PaymentTermId, "id paymentterm");
        self.$store
          .dispatch(GET_PAYMENTTERM, self.Purchase.PaymentTermId)
          .then(response => {
            console.log(response.data.DaysOf);
            if (self.Purchase.PaymentTermId == "") {
              self.Purchase.DueDate = moment(self.Purchase.Date)
                .add(1, "days")
                .format("YYYY-MM-DD");
            } else {
              self.Purchase.DueDate = moment(self.Purchase.Date)
                .add(response.data.DaysOf, "days")
                .format("YYYY-MM-DD");
            }
          });
      }, 1000);
    }
  },
  async created() {
    await this.$store.dispatch("GET_SUPLLIER_OF_PURCHASE");

    await this.$store.dispatch("GET_PAYMENTTERM_OF_PURCHASE");

    await this.$store.dispatch("GET_WAREHOUSE_OF_PURCHASE");

    await this.$store.dispatch("GET_PRODUCT_OF_PURCHASE");

    await this.$store.dispatch("GET_TAX_OF_PURCHASE");

    this.Purchase.Date = moment(new Date()).format("YYYY-MM-DD");
    await this.setDueDate();
    console.log(this.Purchase.DueDate);

    // this.Purchase.DueDate = await moment(this.Purchase.DueDate).format("YYYY-MM-DD")
    // this.Purchase.Date = await moment(this.Purchase.Date).format("YYYY-MM-DD")

    // await this.setToggleDiscount1()
    // await this.setToggleDiscount2()
  }
};
</script>
