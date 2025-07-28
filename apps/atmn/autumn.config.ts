import {
	feature,
	product,
	featureItem,
	pricedFeatureItem,
	priceItem,
} from "atmn";

// Features
export const randomNumber = feature({
	name: "Random Number",
	type: "single_use",
	id: "random_number",
});

// Products
export const freeTier = product({
	id: "free",
	is_default: true,
	name: "Free Tier",
	items: [
		featureItem({
			feature_id: randomNumber.id,
			included_usage: 10,
			interval: "month",
		}),
	],
});

export const paidTier = product({
	id: "paid",
	name: "Paid Tier",
	items: [
		featureItem({
			feature_id: randomNumber.id,
			included_usage: 100,
			interval: "month",
		}),

		priceItem({
			price: 10,
			interval: "month",
		}),
	],
});
