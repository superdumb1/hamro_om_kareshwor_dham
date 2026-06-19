"use client";
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DONOR_TRANSLATIONS } from '@/translations/DonerTranslations';
import { useLanguage } from '@/providers/LanguageToggle';

interface UploadState {
    url: string;
    publicId: string;
    isUploading: boolean;
}

const DonorCreationForm = () => {
    const queryClient = useQueryClient();
    const { lang } = useLanguage();
    const t = DONOR_TRANSLATIONS[lang];

    const [form, setForm] = useState({
        fullName: '',
        address: '',
        donationType: 'Cash',
        amount: '',
        itemDonated: '',
        tributeItem: '',
        contactNumber: '',
        isAnonymous: false,
        receivedDate: new Date().toISOString().split('T')[0],
    });

    const [nagariktaFront, setNagariktaFront] = useState<UploadState>({ url: '', publicId: '', isUploading: false });
    const [nagariktaBack, setNagariktaBack] = useState<UploadState>({ url: '', publicId: '', isUploading: false });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (side === 'front') setNagariktaFront(prev => ({ ...prev, isUploading: true }));
        else setNagariktaBack(prev => ({ ...prev, isUploading: true }));

        try {
            const formData = new FormData();
            formData.append('image', file);

            const res = await fetch('/api/blog/media', {
                method: 'POST',
                body: formData
            });
            
            if (!res.ok) throw new Error('Network channel failed to store payload file');
            const data = await res.json();
            
            if (side === 'front') {
                setNagariktaFront({ url: data.url, publicId: data.publicId, isUploading: false });
            } else {
                setNagariktaBack({ url: data.url, publicId: data.publicId, isUploading: false });
            }
        } catch (err) {
            alert(`File Transmission Failed (${side})`);
            if (side === 'front') setNagariktaFront(prev => ({ ...prev, isUploading: false }));
            else setNagariktaBack(prev => ({ ...prev, isUploading: false }));
        }
    };

    const handleRemoveFile = async (e: React.MouseEvent, side: 'front' | 'back', publicId: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (side === 'front') setNagariktaFront({ url: '', publicId: '', isUploading: false });
        else setNagariktaBack({ url: '', publicId: '', isUploading: false });

        if (!publicId) return;

        try {
            await fetch('/api/blog/media', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ publicId })
            });
        } catch (err) {
            console.error("Purge failure:", err);
        }
    };

    const addDonorMutation = useMutation({
        mutationFn: async (newDonorData: typeof form) => {
            const submissionPayload = {
                ...newDonorData,
                amount: newDonorData.donationType === 'Cash' ? Number(newDonorData.amount) : null,
                itemDonated: newDonorData.donationType === 'Material Asset' ? newDonorData.itemDonated : '',
                nagariktaFrontUrl: nagariktaFront.url,
                nagariktaBackUrl: nagariktaBack.url
            };

            const res = await fetch('/api/donors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionPayload)
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to register donation entry');
            }
            return res.json();
        },
        onSuccess: () => {
            alert(t.alertSuccess);
            setForm({
                fullName: '',
                address: '',
                donationType: 'Cash',
                amount: '',
                itemDonated: '',
                tributeItem: '',
                contactNumber: '',
                isAnonymous: false,
                receivedDate: new Date().toISOString().split('T')[0],
            });
            setNagariktaFront({ url: '', publicId: '', isUploading: false });
            setNagariktaBack({ url: '', publicId: '', isUploading: false });
            queryClient.invalidateQueries({ queryKey: ['public-donors-registry'] });
        },
        onError: (err: Error) => {
            alert(`Registry Error: ${err.message}`);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.isAnonymous && !form.fullName) return;
        if (!form.address) {
            alert(t.alertAddressReq);
            return;
        }
        
        if (form.donationType === 'Cash' && !form.amount) {
            alert(t.alertMinCash);
            return;
        }
        if (form.donationType === 'Material Asset' && !form.itemDonated) {
            alert(t.alertMinMaterial);
            return;
        }
        addDonorMutation.mutate(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-stone-200 p-6 rounded-xl shadow-sm max-w-2xl text-stone-800 text-xs">
            <div className="border-b border-stone-100 pb-2 flex justify-between items-center">
                <h2 className="text-sm font-bold uppercase font-serif text-stone-900">
                    {t.formHeader}
                </h2>
                <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 font-bold px-2 py-0.5 rounded">
                    {t.badgeText}
                </span>
            </div>

            {/* Name and Phone Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">{t.labelName}</label>
                    <input
                        type="text"
                        required={!form.isAnonymous}
                        disabled={form.isAnonymous}
                        value={form.isAnonymous ? t.anonValue : form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder={t.placeholderName}
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none focus:border-orange-500 font-medium disabled:bg-stone-50 disabled:text-stone-400"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">{t.labelContact}</label>
                    <input
                        type="text"
                        value={form.contactNumber}
                        onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                        placeholder="e.g., 98XXXXXXXX"
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none font-mono"
                    />
                </div>
            </div>

            {/* Address and Classification Setup */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">{t.labelAddress}</label>
                    <input
                        type="text"
                        required
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder={t.placeholderAddress}
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">{t.labelType}</label>
                    <select
                        value={form.donationType}
                        onChange={(e) => setForm({ ...form, donationType: e.target.value })}
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none text-stone-700 font-semibold cursor-pointer bg-stone-50"
                    >
                        <option value="Cash">{t.typeCash}</option>
                        <option value="Material Asset">{t.typeMaterial}</option>
                    </select>
                </div>
            </div>

            {/* Dynamic Value/Item Input & Date fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {form.donationType === 'Cash' ? (
                    <div>
                        <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">{t.labelAmount}</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-stone-400 font-bold font-sans">रू</span>
                            </div>
                            <input
                                type="number"
                                required
                                min="1"
                                value={form.amount}
                                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                placeholder="50000"
                                className="w-full pl-8 pr-3 py-1.5 border border-stone-200 rounded-md focus:outline-none focus:border-orange-500 font-mono font-bold text-stone-900"
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">{t.labelItem}</label>
                        <input
                            type="text"
                            required
                            value={form.itemDonated}
                            onChange={(e) => setForm({ ...form, itemDonated: e.target.value })}
                            placeholder={t.placeholderItem}
                            className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none focus:border-orange-500 font-medium text-orange-700 bg-orange-50/20"
                        />
                    </div>
                )}
                
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">{t.labelDate}</label>
                    <input
                        type="date"
                        required
                        value={form.receivedDate}
                        onChange={(e) => setForm({ ...form, receivedDate: e.target.value })}
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none font-mono text-stone-700 bg-stone-50 cursor-pointer"
                    />
                </div>
            </div>

            {/* Tribute Strings Box */}
            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">{t.labelTribute}</label>
                <input
                    type="text"
                    value={form.tributeItem}
                    onChange={(e) => setForm({ ...form, tributeItem: e.target.value })}
                    placeholder={t.placeholderTribute}
                    className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none"
                />
            </div>

            {/* Dual Identity File Layout Node */}
            <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase text-stone-500">
                    {t.labelNagarikta}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Front Side Card Slot */}
                    <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50 flex flex-col justify-between min-h-[90px] relative hover:bg-stone-50 transition-colors group">
                        {!nagariktaFront.url && !nagariktaFront.isUploading && (
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleFileUpload(e, 'front')} 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                        )}
                        <div className="flex items-start gap-2.5">
                            <div className="p-2 bg-stone-200/60 rounded-lg text-stone-500 shrink-0">🖼️</div>
                            <div>
                                <h4 className="font-bold text-stone-800">{t.nagariktaFront}</h4>
                                <p className="text-[10px] text-stone-400">{t.nagariktaFrontDesc}</p>
                            </div>
                        </div>
                        
                        {nagariktaFront.isUploading && (
                            <div className="absolute inset-0 bg-white/70 backdrop-blur-[0.5px] rounded-xl flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-stone-200 border-t-orange-600 rounded-full animate-spin"></div>
                            </div>
                        )}

                        <div className="mt-2 flex items-center justify-between z-20">
                            <span className="text-[10px] font-semibold text-orange-600">
                                {nagariktaFront.isUploading ? t.statusUploading : nagariktaFront.url ? t.statusAttached : t.statusSelect}
                            </span>
                            {nagariktaFront.url && (
                                <div className="relative">
                                    <img src={nagariktaFront.url} className="w-8 h-6 object-cover rounded border border-stone-200" alt="Front Preview" />
                                    <button
                                        type="button"
                                        onClick={(e) => handleRemoveFile(e, 'front', nagariktaFront.publicId)}
                                        className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] shadow cursor-pointer transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Back Side Card Slot */}
                    <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50 flex flex-col justify-between min-h-[90px] relative hover:bg-stone-50 transition-colors group">
                        {!nagariktaBack.url && !nagariktaBack.isUploading && (
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleFileUpload(e, 'back')} 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                        )}
                        <div className="flex items-start gap-2.5">
                            <div className="p-2 bg-stone-200/60 rounded-lg text-stone-500 shrink-0">📄</div>
                            <div>
                                <h4 className="font-bold text-stone-800">{t.nagariktaBack}</h4>
                                <p className="text-[10px] text-stone-400">{t.nagariktaBackDesc}</p>
                            </div>
                        </div>

                        {nagariktaBack.isUploading && (
                            <div className="absolute inset-0 bg-white/70 backdrop-blur-[0.5px] rounded-xl flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-stone-200 border-t-orange-600 rounded-full animate-spin"></div>
                            </div>
                        )}

                        <div className="mt-2 flex items-center justify-between z-20">
                            <span className="text-[10px] font-semibold text-orange-600">
                                {nagariktaBack.isUploading ? t.statusUploading : nagariktaBack.url ? t.statusAttached : t.statusSelect}
                            </span>
                            {nagariktaBack.url && (
                                <div className="relative">
                                    <img src={nagariktaBack.url} className="w-8 h-6 object-cover rounded border border-stone-200" alt="Back Preview" />
                                    <button
                                        type="button"
                                        onClick={(e) => handleRemoveFile(e, 'back', nagariktaBack.publicId)}
                                        className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] shadow cursor-pointer transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Privacy Check Block Component */}
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-center gap-3">
                <input
                    type="checkbox"
                    id="privacyToggle"
                    checked={form.isAnonymous}
                    onChange={(e) => {
                        const checked = e.target.checked;
                        setForm({
                            ...form,
                            isAnonymous: checked,
                            fullName: checked ? 'Anonymous' : ''
                        });
                    }}
                    className="w-4 h-4 rounded border-stone-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                />
                <label htmlFor="privacyToggle" className="select-none font-medium text-stone-600 cursor-pointer">
                    {t.maskCheck}
                </label>
            </div>

            {/* Submit Action Block */}
            <button
                type="submit"
                disabled={addDonorMutation.isPending || nagariktaFront.isUploading || nagariktaBack.isUploading}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer disabled:opacity-40"
            >
                {addDonorMutation.isPending ? t.btnPending : t.btnSubmit}
            </button>
        </form>
    );
};

export default DonorCreationForm;