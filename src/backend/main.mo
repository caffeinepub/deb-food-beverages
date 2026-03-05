import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  module Product {
    public type Category = {
      #jeeraSoda;
      #lemonSoda;
      #greenMangoSoda;
      #general;
    };

    public type Product = {
      id : Nat;
      name : Text;
      description : Text;
      price : Nat;
      available : Bool;
    };
  };

  module Inquiry {
    public type Inquiry = {
      name : Text;
      email : Text;
      message : Text;
      productInterest : Product.Category;
    };
  };

  let productCatalog = Map.empty<Nat, Product.Product>();
  let inquiries = Map.empty<Nat, Inquiry.Inquiry>();
  var nextInquiryId = 0;

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text, productInterest : Product.Category) : async () {
    let inquiry : Inquiry.Inquiry = {
      name;
      email;
      message;
      productInterest;
    };
    inquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry.Inquiry] {
    if (inquiries.isEmpty()) {
      Runtime.trap("No inquiries found. This function should only be used by authorized admins.");
    };
    inquiries.values().toArray();
  };

  public query ({ caller }) func getAllProducts() : async [Product.Product] {
    productCatalog.values().toArray();
  };

  public shared ({ caller }) func updateProductAvailability(id : Nat, available : Bool) : async () {
    switch (productCatalog.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        let updatedProduct = {
          product with
          available
        };
        productCatalog.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func updateProductPrice(id : Nat, price : Nat) : async () {
    switch (productCatalog.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        let updatedProduct = {
          product with
          price
        };
        productCatalog.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func updateProductDescription(id : Nat, description : Text) : async () {
    switch (productCatalog.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        let updatedProduct = {
          product with
          description
        };
        productCatalog.add(id, updatedProduct);
      };
    };
  };

  public query ({ caller }) func getProductById(id : Nat) : async Product.Product {
    switch (productCatalog.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func seedProducts() : async () {
    productCatalog.add(
      1,
      {
        id = 1;
        name = "Jeera Soda";
        description = "A refreshing Indian spiced soda with cumin flavor.";
        price = 50;
        available = true;
      },
    );
    productCatalog.add(
      2,
      {
        id = 2;
        name = "Lemon Soda";
        description = "Classic lemon-flavored soda, perfect for hot days.";
        price = 45;
        available = true;
      },
    );
    productCatalog.add(
      3,
      {
        id = 3;
        name = "Green Mango Soda";
        description = "Tangy green mango soda with a hint of spice.";
        price = 55;
        available = true;
      },
    );
  };
};
