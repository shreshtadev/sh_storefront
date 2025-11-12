import { component$ } from '@qwik.dev/core';
import { Image } from '../image/image';
import Price from './Price';

export default component$(
	({ productAsset, productName, slug, price, currencyCode, hsnSac }: any) => {
		return (
			<a class="flex flex-col mx-auto" href={`/products/${slug}/`}>
				<Image
					layout="fixed"
					class="rounded-xl flex-grow object-cover aspect-[7/8]"
					width="200"
					height="200"
					src={productAsset?.preview + '?w=300&h=400&format=webp'}
					alt={`Image of: ${productName}`}
				/>
				<div class="h-2" />
				<div class="text-sm text-gray-700">
					{productName}
					<span class="text-xs">{hsnSac}</span>
				</div>
				<Price
					price={price}
					currencyCode={currencyCode}
					forcedClass="text-sm font-medium text-gray-900"
				/>
			</a>
		);
	}
);
