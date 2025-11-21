// src/components/PaymentInfo.tsx
import { component$, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { getPaymentInfo, getQrCode } from '~/providers/shop/checkout/checkout';

interface PaymentInfoProps {
	methodCode: string;
}

export default component$<PaymentInfoProps>(({ methodCode }) => {
	const paymentData = useSignal<any>(null);
	const qrImage = useSignal<any>(null);
	const loading = useSignal(true);

	useVisibleTask$(async () => {
		loading.value = true;
		try {
			paymentData.value = await getPaymentInfo(methodCode);
			qrImage.value = await getQrCode(paymentData.value['upiId']);
		} finally {
			loading.value = false;
		}
	});

	return (
		<section class="p-4 bg-white rounded-xl shadow-md max-w-sm mx-auto">
			{loading.value ? (
				<p class="text-gray-500 text-center">🔄 Loading payment info…</p>
			) : paymentData.value ? (
				<div class="space-y-4">
					<h2 class="text-xl font-bold text-gray-800 text-center">💳 Payment Details</h2>

					<div class="grid grid-cols-1 gap-2 text-sm text-gray-700">
						<p>
							<strong>🏦 Bank:</strong> {paymentData.value.customFields.bankName}
						</p>
						<p>
							<strong>👤 Account Name:</strong> {paymentData.value.customFields.accountName}
						</p>
						<p>
							<strong>🔢 Account Number:</strong> {paymentData.value.customFields.accountNumber}
						</p>
						<p>
							<strong>🏷️ IFSC:</strong> {paymentData.value.customFields.ifscCode}
						</p>
						<p>
							<strong>📞 Phone:</strong> {paymentData.value.customFields.contactNumber}
						</p>
					</div>

					<div class="flex flex-col items-center gap-2 mt-4">
						<img
							src={qrImage.value}
							alt={`QR for ${paymentData.value.upiId}`}
							class="w-40 h-40 object-contain rounded-md border"
						/>
						<p class="text-sm text-gray-800">
							<strong>💡 UPI ID:</strong> {paymentData.value.customFields.upiId}
						</p>
						<small class="text-sm text-gray-800">
							<strong>💡 Extra Instructions:</strong>{' '}
							{paymentData.value.customFields.extraInstructions}
						</small>
						<button
							class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
							onClick$={() => navigator.clipboard.writeText(paymentData.value.customFields.upiId)}
						>
							📋 Copy UPI ID
						</button>
					</div>
				</div>
			) : (
				<p class="text-red-500 text-center">❌ No payment info found for code: {methodCode}</p>
			)}
		</section>
	);
});
