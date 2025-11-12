import { component$, Signal } from '@qwik.dev/core';
import { CurrencyCode } from '~/types';
import { formatPrice } from '~/utils';

export default component$<{
	price: number | undefined;
	currencyCode: CurrencyCode | string | undefined;
	variantSig?: Signal<unknown>;
	forcedClass?: string;
}>(({ price, currencyCode, variantSig, forcedClass }: any) => {
	return (
		<div>
			{variantSig?.value && <div class="hidden">{JSON.stringify(variantSig.value)}</div>}
			{!currencyCode ? (
				<div></div>
			) : typeof price === 'number' ? (
				<div class={forcedClass}>{formatPrice(price, currencyCode)}</div>
			) : 'value' in price ? (
				<div class={forcedClass}>{formatPrice(price.value, currencyCode)}</div>
			) : price.min === price.max ? (
				<div class={forcedClass}>{formatPrice(price.min, currencyCode)}</div>
			) : (
				<div class={forcedClass}>
					{formatPrice(price.min, currencyCode)} - {formatPrice(price.max, currencyCode)}
				</div>
			)}
		</div>
	);
});
