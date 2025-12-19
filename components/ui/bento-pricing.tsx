'use client';
import React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, SparklesIcon, Check } from 'lucide-react';

type PricingCardProps = {
	titleBadge: string;
	priceLabel: string;
	priceSuffix?: string;
	features: string[];
	cta?: string;
	className?: string;
	originalPrice?: string;
	discountText?: string;
	buttonClassName?: string;
};

function FilledCheck() {
	return (
		<div className="bg-primary text-primary-foreground rounded-full p-0.5 flex-shrink-0 mt-1">
			<CheckIcon className="h-4 w-4" strokeWidth={3} />
		</div>
	);
}

function PricingCard({
	titleBadge,
	priceLabel,
	priceSuffix = '/month',
	features,
	cta = 'Subscribe',
	className,
	originalPrice,
	discountText,
	buttonClassName,
}: PricingCardProps) {
	return (
		<div
			className={cn(
				'bg-background border-foreground/10 relative overflow-hidden rounded-md border',
				'supports-[backdrop-filter]:bg-background/10 backdrop-blur',
				className,
			)}
		>
			<div className="flex items-center gap-3 p-4">
				<Badge variant="secondary">{titleBadge}</Badge>
				<div className="ml-auto">
					<Button variant={buttonClassName ? undefined : "outline"} className={cn("text-lg font-semibold tracking-tighter", buttonClassName)}>{cta}</Button>
				</div>
			</div>

			<div className="flex flex-col px-4 py-2">
				{originalPrice && (
					<span className="text-gray-400 text-lg line-through mb-1">{originalPrice}</span>
				)}
				<div className="flex items-end gap-2">
					<span className="text-5xl font-bold tracking-tight text-foreground">
						{priceLabel}
					</span>
					{priceLabel.toLowerCase() !== 'free' && (
						<span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">{priceSuffix}</span>
					)}
				</div>
				{discountText && (
					<span className="text-[#3D3072] text-sm font-semibold mt-2">{discountText}</span>
				)}
			</div>

			<ul className="mt-5 gap-2 flex flex-col p-4">
				{features.map((f, i) => (
					<li key={i} className="flex items-start gap-2">
						<Check className="h-4 w-4 mt-1 flex-shrink-0 text-[#3D3072]" />
						<span className="text-left">{f}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

export function BentoPricing() {
	return (
		<div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-8">
			<div
				className={cn(
					'bg-background border-foreground/10 relative w-full overflow-hidden rounded-md border',
					'supports-[backdrop-filter]:bg-background/10 backdrop-blur',
					'lg:col-span-5',
				)}
			>
				<div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
					<div className="from-foreground/5 to-foreground/2 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
						<div
							aria-hidden="true"
							className={cn(
								'absolute inset-0 size-full mix-blend-overlay',
								'bg-[linear-gradient(to_right,--theme(--color-foreground/.1)_1px,transparent_1px)]',
								'bg-[size:24px]',
							)}
						/>
					</div>
				</div>
				<div className="flex items-center gap-3 p-4">
					<Badge variant="secondary">ARA TATİL 8. SINIF 1. DÖNEM TEKRAR KAMPI</Badge>
					<Badge variant="outline" className="hidden lg:flex text-white bg-[#3D3072]">
						<SparklesIcon className="me-1 size-3" /> En Çok Önerilen
					</Badge>
					<div className="ml-auto">
						<Button className="text-lg font-semibold tracking-tighter bg-[#3D3072] text-white hover:bg-[#3D3072]/90">Hemen Başlayın</Button>
					</div>
				</div>
				<div className="flex flex-col p-4 lg:flex-row">
					<div className="pb-4 lg:w-[30%]">
						<span className="text-gray-400 text-lg line-through mb-1 block">18 000₺</span>
						<span className="text-5xl font-bold tracking-tight text-foreground">
							9.000₺
						</span>
						<span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">/paket</span>
						<span className="text-[#3D3072] text-sm font-semibold mt-2 block">Sınırlı süreye özel %50 indirim</span>
					</div>
					<ul className="mt-5 gap-2 flex flex-col lg:w-[70%]">
						{[
							'13 gün yoğun program',
							'Günlük 4 saat ders',
							'Sessiz online sınıf ortamı',
							'Ödevlendirme ve takip',
						].map((f, i) => (
							<li key={i} className="flex items-start gap-2">
								<Check className="h-4 w-4 mt-1 flex-shrink-0 text-[#3D3072]" />
								<span className="text-left">{f}</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			<PricingCard
				titleBadge="LGS/8. SINIF KAMPI"
				priceLabel="9.000₺"
				priceSuffix="/dönem"
				originalPrice="18 000₺"
				discountText="Sınırlı süreye özel %50 indirim"
				features={[
					'240 ders saati',
					'Sessiz online sınıf ortamı',
					'Ödevlendirme ve takip',
					'Haftalık deneme sınavı',
					'Ücretsiz soru çözümü',
					'Sınav taktikleri paylaşımları',
				]}
				cta="Hemen Başlayın"
				buttonClassName="bg-[#3D3072] text-white hover:bg-[#3D3072]/90"
				className="lg:col-span-3"
			/>
		</div>
	);
}

