"use client";
import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const MembershipForm = () => {
    const queryClient = useQueryClient();
    const frontInputRef = useRef<HTMLInputElement>(null);
    const backInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        memberId: '',
        status: 'Active Member'
    });

    const [files, setFiles] = useState<{ frontSide: File | null; backSide: File | null }>({
        frontSide: null,
        backSide: null
    });

    const addMemberMutation = useMutation({
        mutationFn: async (payload: FormData) => {
            const res = await fetch('/api/members', {
                method: 'POST',
                body: payload // Sent directly as multipart/form-data
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to save record');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
            // Reset form input tracking properties clean
            setFormData({ name: '', address: '', memberId: '', status: 'Active Member' });
            setFiles({ frontSide: null, backSide: null });
            if (frontInputRef.current) frontInputRef.current.value = '';
            if (backInputRef.current) backInputRef.current.value = '';
            alert('Member saved and documents archived securely.');
        },
        onError: (error: Error) => {
            alert(`Error: ${error.message}`);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.address || !formData.memberId || !files.frontSide || !files.backSide) {
            alert("Please fill all fields and attach both side images.");
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('address', formData.address);
        data.append('memberId', formData.memberId);
        data.append('status', formData.status);
        data.append('frontSide', files.frontSide);
        data.append('backSide', files.backSide);

        addMemberMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Full Name</label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-orange-500 text-stone-800 font-medium"
                />
            </div>
            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Address Ward Reference</label>
                <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-orange-500 text-stone-800 font-medium"
                />
            </div>
            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Assigned Member ID Code</label>
                <input
                    type="text"
                    required
                    value={formData.memberId}
                    onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-orange-500 font-mono text-stone-800"
                />
            </div>
            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Samity Status</label>
                <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-md focus:outline-none text-stone-700 font-medium cursor-pointer"
                >
                    <option value="Active Member">Active Member</option>
                    <option value="Pending Audit">Pending Audit</option>
                </select>
            </div>

            {/* Document upload field groupings */}
            <div className="pt-2 border-t border-stone-100 space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Identification Proof (Nagarikta / NID)</span>
                
                <div>
                    <label className="block text-[10px] font-medium text-stone-600 mb-1">🪪 Document Front Side</label>
                    <input
                        type="file"
                        ref={frontInputRef}
                        accept="image/*"
                        required
                        onChange={(e) => setFiles(prev => ({ ...prev, frontSide: e.target.files?.[0] || null }))}
                        className="w-full text-xs text-stone-500 file:mr-3 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-stone-200 file:text-stone-700 hover:file:bg-stone-300 cursor-pointer"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-medium text-stone-600 mb-1">🔄 Document Back Side</label>
                    <input
                        type="file"
                        ref={backInputRef}
                        accept="image/*"
                        required
                        onChange={(e) => setFiles(prev => ({ ...prev, backSide: e.target.files?.[0] || null }))}
                        className="w-full text-xs text-stone-500 file:mr-3 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-stone-200 file:text-stone-700 hover:file:bg-stone-300 cursor-pointer"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={addMemberMutation.isPending}
                className="w-full mt-2 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
                {addMemberMutation.isPending ? 'Uploading Docs & Saving...' : 'Commit to Database Record'}
            </button>
        </form>
    );
};

export default MembershipForm;