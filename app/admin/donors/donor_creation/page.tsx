"use client";
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const DonorCreationForm = () => {
    const queryClient = useQueryClient();

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
        nagariktaFrontUrl: '',
        nagariktaBackUrl: ''
    });

    // Tracking isolated upload workflows
    const [uploadingFront, setUploadingFront] = useState(false);
    const [uploadingBack, setUploadingBack] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (side === 'front') setUploadingFront(true);
        else setUploadingBack(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            
            if (!res.ok) throw new Error('Network channel failed to store payload file');
            const data = await res.json();
            
            setForm(prev => ({
                ...prev,
                [side === 'front' ? 'nagariktaFrontUrl' : 'nagariktaBackUrl']: data.url
            }));
        } catch (err) {
            alert(`File Transmission Failed: Could not archive identity document (${side} copy)`);
        } finally {
            if (side === 'front') setUploadingFront(false);
            else setUploadingBack(false);
        }
    };

    const addDonorMutation = useMutation({
        mutationFn: async (newDonorData: typeof form) => {
            const submissionPayload = {
                ...newDonorData,
                amount: newDonorData.donationType === 'Cash' ? Number(newDonorData.amount) : null,
                itemDonated: newDonorData.donationType === 'Material Asset' ? newDonorData.itemDonated : ''
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
            alert('Donor profile recorded successfully with identity reference tracks!');
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
                nagariktaFrontUrl: '',
                nagariktaBackUrl: ''
            });
            queryClient.invalidateQueries({ queryKey: ['public-donors-registry'] });
        },
        onError: (err: Error) => {
            alert(`Registry Error: ${err.message}`);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.fullName || !form.address) return;
        if (form.donationType === 'Cash' && !form.amount) {
            alert('Please specify the monetary cash contribution amount.');
            return;
        }
        if (form.donationType === 'Material Asset' && !form.itemDonated) {
            alert('Please specify the details of the physical item donated.');
            return;
        }
        addDonorMutation.mutate(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-stone-200 p-6 rounded-xl shadow-sm max-w-2xl text-stone-800 text-xs">
            <div className="border-b border-stone-100 pb-2 flex justify-between items-center">
                <h2 className="text-sm font-bold uppercase font-serif text-stone-900">
                    Log Contribution / Donor Profile
                </h2>
                <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 font-bold px-2 py-0.5 rounded">
                    Treasury Input
                </span>
            </div>

            {/* Donor Identity Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Donor / Family Full Name</label>
                    <input
                        type="text"
                        required
                        disabled={form.isAnonymous}
                        value={form.isAnonymous ? "Anonymous (Spiritual Donor)" : form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="e.g., Ram Bahadur Thapa"
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none focus:border-orange-500 font-medium disabled:bg-stone-50 disabled:text-stone-400"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Contact Phone (Internal Record Only)</label>
                    <input
                        type="text"
                        value={form.contactNumber}
                        onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                        placeholder="e.g., 98XXXXXXXX"
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none font-mono"
                    />
                </div>
            </div>

            {/* Address and Contribution Type Options Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Address / Location</label>
                    <input
                        type="text"
                        required
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="e.g., Mechinagar-11, Jhapa"
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Donation Type Classification</label>
                    <select
                        value={form.donationType}
                        onChange={(e) => setForm({ ...form, donationType: e.target.value })}
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none text-stone-700 font-semibold cursor-pointer bg-stone-50"
                    >
                        <option value="Cash">Cash Contribution (रू)</option>
                        <option value="Material Asset">Material Asset / Physical Item</option>
                    </select>
                </div>
            </div>

            {/* Dynamic Middle Field Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {form.donationType === 'Cash' ? (
                    <div>
                        <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Contribution Amount (NPR)</label>
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
                        <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Physical Item Specification</label>
                        <input
                            type="text"
                            required
                            value={form.itemDonated}
                            onChange={(e) => setForm({ ...form, itemDonated: e.target.value })}
                            placeholder="e.g., 50 Bags of Cement / Brass Ghanti"
                            className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none focus:border-orange-500 font-medium text-orange-700 bg-orange-50/20"
                        />
                    </div>
                )}
                
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Receipt Date</label>
                    <input
                        type="date"
                        required
                        value={form.receivedDate}
                        onChange={(e) => setForm({ ...form, receivedDate: e.target.value })}
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none font-mono text-stone-700 bg-stone-50 cursor-pointer"
                    />
                </div>
            </div>

            {/* Dedicated Item / Tribute Notes */}
            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Dedicated Tribute Infrastructure / Dedicated Notes (Optional)</label>
                <input
                    type="text"
                    value={form.tributeItem}
                    onChange={(e) => setForm({ ...form, tributeItem: e.target.value })}
                    placeholder="e.g., Intended for Mandir East Pillar No. 4"
                    className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none"
                />
            </div>

            {/* 🇳🇵 Dual-Side Nagarikta Upload Box Grid Setup */}
            <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase text-stone-500">
                    Nagarikta Verification Files (Internal Admin Audit Trail Only)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Front Side File Picker */}
                    <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50 flex flex-col justify-between min-h-[90px] relative hover:bg-stone-50 transition-colors">
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleFileUpload(e, 'front')} 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex items-start gap-2.5">
                            <div className="p-2 bg-stone-200/60 rounded-lg text-stone-500 shrink-0">🖼️</div>
                            <div>
                                <h4 className="font-bold text-stone-800">Nagarikta Front Side</h4>
                                <p className="text-[10px] text-stone-400">Nepali details & passport photograph</p>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-orange-600">
                                {uploadingFront ? 'Saving raw pixels...' : form.nagariktaFrontUrl ? '✓ Ready in queue' : 'Click to select'}
                            </span>
                            {form.nagariktaFrontUrl && (
                                <img src={form.nagariktaFrontUrl} className="w-8 h-6 object-cover rounded border border-stone-200" alt="Front Preview" />
                            )}
                        </div>
                    </div>

                    {/* Back Side File Picker */}
                    <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50 flex flex-col justify-between min-h-[90px] relative hover:bg-stone-50 transition-colors">
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleFileUpload(e, 'back')} 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex items-start gap-2.5">
                            <div className="p-2 bg-stone-200/60 rounded-lg text-stone-500 shrink-0">📄</div>
                            <div>
                                <h4 className="font-bold text-stone-800">Nagarikta Back Side</h4>
                                <p className="text-[10px] text-stone-400">Issue authority stamp & signatures</p>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-orange-600">
                                {uploadingBack ? 'Saving raw pixels...' : form.nagariktaBackUrl ? '✓ Ready in queue' : 'Click to select'}
                            </span>
                            {form.nagariktaBackUrl && (
                                <img src={form.nagariktaBackUrl} className="w-8 h-6 object-cover rounded border border-stone-200" alt="Back Preview" />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Privacy Checkbox */}
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
                    Mask Name Publicly (Mark as Anonymous Donor on public display feed board)
                </label>
            </div>

            {/* Submit Action Button */}
            <button
                type="submit"
                disabled={addDonorMutation.isPending || uploadingFront || uploadingBack}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer disabled:opacity-40"
            >
                {addDonorMutation.isPending ? 'Writing Transaction Record...' : 'Archive Donor in Record Ledger'}
            </button>
        </form>
    );
};

export default DonorCreationForm;