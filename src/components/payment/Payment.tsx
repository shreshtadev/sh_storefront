import { $, component$, QRL, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { getEligiblePaymentMethodsQuery } from '~/providers/shop/checkout/checkout';
import { EligiblePaymentMethods } from '~/types';
import CreditCardIcon from '../icons/CreditCardIcon';
import PaymentContact from './PaymentContact';

export default component$<{ onForward$: QRL<() => void> }>(({ onForward$ }) => {
	const paymentMethods = useSignal<EligiblePaymentMethods[]>();

	useVisibleTask$(async () => {
		paymentMethods.value = await getEligiblePaymentMethodsQuery();
	});

	return (
		<div class="flex flex-col space-y-24 items-center">
			{paymentMethods.value?.map((method) => (
				<div key={method.code} class="flex flex-col items-center">
					{method.code === 'standard-payment' && (
						<>
							<div class="space-y-6">
								{/* Payment Contact Section */}
								<div>
									<PaymentContact methodCode={method.code} />
								</div>

								{/* Bank Transfer Button */}
								<button
									class="w-full flex flex-col sm:flex-row items-center justify-center gap-2 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white text-base font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
									onClick$={$(async () => {
										onForward$();
									})}
								>
									<div class="flex items-center gap-2">
										<CreditCardIcon />
										<span class="text-lg">Pay via {method.name}</span>
									</div>
								</button>
							</div>
						</>
					)}
					{/* {method.code.includes('stripe') && <StripePayment />}
					{method.code.includes('braintree') && <BraintreePayment />} */}
				</div>
			))}
		</div>
	);
});
