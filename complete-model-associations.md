// models/User.js
class User extends Model {
  static associate(models) {
    // Ratings
    User.hasMany(models.UserRating, {
      foreignKey: 'reviewerId',
      as: 'givenRatings'
    });
    User.hasMany(models.UserRating, {
      foreignKey: 'ratedUserId',
      as: 'receivedRatings'
    });

    // Sneakers
    User.hasMany(models.Sneaker, {
      foreignKey: 'UserId',
      as: 'sneakers'
    });

    // Auctions
    User.hasMany(models.Lelang, {
      foreignKey: 'UserId',
      as: 'createdAuctions'
    });
    User.hasMany(models.Lelang, {
      foreignKey: 'winnerId',
      as: 'wonAuctions'
    });

    // Bids
    User.hasMany(models.Bid, {
      foreignKey: 'UserId',
      as: 'bids'
    });

    // Preorders
    User.hasMany(models.Preorder, {
      foreignKey: 'UserId',
      as: 'createdPreorders'
    });
    User.hasMany(models.PreorderTransaction, {
      foreignKey: 'UserId',
      as: 'preorderTransactions'
    });
  }
}

// models/Sneaker.js
class Sneaker extends Model {
  static associate(models) {
    // Owner
    Sneaker.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'owner'
    });

    // Auctions
    Sneaker.hasMany(models.Lelang, {
      foreignKey: 'sneakerId',
      as: 'auctions'
    });
  }
}

// models/Lelang.js
class Lelang extends Model {
  static associate(models) {
    // Users
    Lelang.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'creator'
    });
    Lelang.belongsTo(models.User, {
      foreignKey: 'winnerId',
      as: 'winner'
    });

    // Sneaker
    Lelang.belongsTo(models.Sneaker, {
      foreignKey: 'sneakerId',
      as: 'sneaker'
    });

    // Bids
    Lelang.hasMany(models.Bid, {
      foreignKey: 'auctionId',
      as: 'bids'
    });

    // Ratings
    Lelang.hasMany(models.UserRating, {
      foreignKey: 'transactionId',
      constraints: false,
      scope: {
        transactionType: 'auction'
      },
      as: 'ratings'
    });
  }
}

// models/Bid.js
class Bid extends Model {
  static associate(models) {
    // User
    Bid.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'bidder'
    });

    // Auction
    Bid.belongsTo(models.Lelang, {
      foreignKey: 'auctionId',
      as: 'auction'
    });
  }
}

// models/Preorder.js
class Preorder extends Model {
  static associate(models) {
    // Creator
    Preorder.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'creator'
    });

    // Transactions
    Preorder.hasMany(models.PreorderTransaction, {
      foreignKey: 'preorderId',
      as: 'transactions'
    });
  }
}

// models/PreorderTransaction.js
class PreorderTransaction extends Model {
  static associate(models) {
    // User
    PreorderTransaction.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'buyer'
    });

    // Preorder
    PreorderTransaction.belongsTo(models.Preorder, {
      foreignKey: 'preorderId',
      as: 'preorder'
    });

    // Ratings
    PreorderTransaction.hasMany(models.UserRating, {
      foreignKey: 'transactionId',
      constraints: false,
      scope: {
        transactionType: 'preorder'
      },
      as: 'ratings'
    });
  }
}

// models/UserRating.js
class UserRating extends Model {
  static associate(models) {
    // Users
    UserRating.belongsTo(models.User, {
      foreignKey: 'ratedUserId',
      as: 'ratedUser'
    });
    UserRating.belongsTo(models.User, {
      foreignKey: 'reviewerId',
      as: 'reviewer'
    });

    // Polymorphic associations for transactions
    UserRating.belongsTo(models.Lelang, {
      foreignKey: 'transactionId',
      constraints: false,
      as: 'auctionTransaction'
    });
    UserRating.belongsTo(models.PreorderTransaction, {
      foreignKey: 'transactionId',
      constraints: false,
      as: 'preorderTransaction'
    });
  }
}
