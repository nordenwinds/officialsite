import {
	CONTENTFUL_DELIVERY_TOKEN,
	CONTENTFUL_ENV,
	CONTENTFUL_PREVIEW_TOKEN,
	CONTENTFUL_SPACE_ID,
} from "astro:env/server";
import * as contentful from "contentful";

const accessToken: string = (() => {
	if (import.meta.env.DEV) {
		if (CONTENTFUL_PREVIEW_TOKEN) {
			return CONTENTFUL_PREVIEW_TOKEN;
		}
		throw Error("CONTENTFUL_PREVIEW_TOKEN is required.");
	}
	if (CONTENTFUL_DELIVERY_TOKEN) {
		return CONTENTFUL_DELIVERY_TOKEN;
	}
	throw Error("CONTENTFUL_DELIVERY_TOKEN is required.");
})();

export const contentfulClient = contentful.createClient({
	space: CONTENTFUL_SPACE_ID,
	accessToken: accessToken,
	host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
	environment: CONTENTFUL_ENV,
});
