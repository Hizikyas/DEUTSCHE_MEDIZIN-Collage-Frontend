import React, { useState, useEffect } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, X, User } from "lucide-react";
import LightRays from "@/designs/LightRays";
import { useTranslation } from "react-i18next";
import Select, { components } from "react-select";
import { Combobox } from "@headlessui/react";
import useApi from "../hooks/useApi";
import endPoints from "@/components/api/endPoints";
import DarkVeil from "../designs/DarkVeil";
import apiService from "@/components/api/apiService";
const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <svg
      className="w-4 h-4 text-gray-500 dark:text-gray-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </components.DropdownIndicator>
);
const PersonalInformationStep = ({
  formData,
  setFormData,
  dropdowns,
  fetchZonesByRegion,
  fetchWoredasByZone,
}) => {
  const countries = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "GB", label: "United Kingdom" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
    { value: "CN", label: "China" },
    { value: "IN", label: "India" },
    { value: "BR", label: "Brazil" },
    { value: "ZA", label: "South Africa" },
    { value: "ET", label: "Ethiopia" },
    { value: "KE", label: "Kenya" },
    { value: "NG", label: "Nigeria" },
    { value: "AU", label: "Australia" },
    { value: "RU", label: "Russia" },
  ];

  const [previews, setPreviews] = useState(
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
  );
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cascading dropdown handlers
  const handleRegionChange = async (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      placeOfBirthRegionCode: value,
      placeOfBirthZoneCode: "",
      placeOfBirthWoredaCode: "",
    }));
    if (value) {
      await fetchZonesByRegion(value, "birth");
    }
  };

  const handleZoneChange = async (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      placeOfBirthZoneCode: value,
      placeOfBirthWoredaCode: "",
    }));
    if (value) {
      await fetchWoredasByZone(value, "birth");
    }
  };

  const handleCurrentRegionChange = async (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      currentAddressRegionCode: value,
      currentAddressZoneCode: "",
      currentAddressWoredaCode: "",
    }));
    if (value) {
      await fetchZonesByRegion(value, "current");
    }
  };

  const handleCurrentZoneChange = async (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      currentAddressZoneCode: value,
      currentAddressWoredaCode: "",
    }));
    if (value) {
      await fetchWoredasByZone(value, "current");
    }
  };
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviews(imageURL);
      const img = new Image();
      img.src = imageURL;
      img.onload = () => URL.revokeObjectURL(imageURL);
    }
  }
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? countries
      : countries.filter((c) =>
          c.label.toLowerCase().includes(query.toLowerCase())
        );
  return (
    <div className="space-y-6 ">
      {/* <CHANGE> Added step title and description */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 ">
          Personal Information
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please provide your basic personal details and contact information.
        </p>
      </div>

      {/* 2. PERSONAL DATA */}
      <section className="border-2 border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          1. PERSONAL DATA
        </h3>

        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Full Name (English): *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-white mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-white mb-1">
                Middle Name *
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-white mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Full Name (Amharic): *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-white mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstNameAMH"
                value={formData.firstNameAMH}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-200 mb-1">
                Middle Name *
              </label>
              <input
                type="text"
                name="middleNameAMH"
                value={formData.middleNameAMH}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-200 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastNameAMH"
                value={formData.lastNameAMH}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Sex and Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Sex: *
            </label>
            <div className="flex gap-4">
              {["Male", "Female"].map((gender) => (
                <label key={gender} className="flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value={gender}
                    checked={formData.sex === gender}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Age: *
            </label>
            <input
              type="number"
              name="age"
              min="16"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Information about Impairment (if any): (Optional)
          </label>
          <select
            name="impairmentCode"
            value={formData.impairmentCode}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Impairment</option>
            {dropdowns.impairments.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
          Student Photo (Optional)
        </label>
        <section className="border-2 border-blue-200 rounded-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
          <div className="border-t-2 border-blue-400 dark:border-gray-600 pt-4 flex flex-col items-center">
            {/* Certificate Icon/Image */}
            <img
              src={previews || "/default-avatar.png"} // fallback default
              alt="Student Photo"
              className="w-24 h-24 rounded-full mb-4 border-2 border-blue-300 dark:border-gray-500 object-cover"
            />

            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2 text-center">
              Please upload your student photo
            </h3>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4 text-center">
              Upload a clear portrait image (JPG or PNG)
            </p>

            {/* Certificate uploader */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
              {/* Hidden input */}
              <input
                id="upload-studentphoto"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData((prev) => ({
                      ...prev,
                      studentPhoto: file,
                      prevPhoto: URL.createObjectURL(file),
                    }));
                  }
                }}
                className="hidden"
              />

              {/* Custom upload button */}
              <label
                htmlFor="upload-studentphoto"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow cursor-pointer hover:from-blue-700 hover:to-blue-800 transition"
              >
                <ImageIcon className="w-5 h-5" />
                <span>Upload Student Photo</span>
              </label>

              {/* File name */}
              <span className="text-gray-600 dark:text-gray-300 text-sm mt-2 sm:mt-0">
                {formData.studentPhoto
                  ? formData.studentPhoto.name
                  : "No file chosen"}
              </span>
            </div>

            {/* Preview (optional for images only) */}
            {formData.studentPhoto &&
              formData.studentPhoto instanceof File &&
              formData.studentPhoto.type.startsWith("image/") && (
                <div className="mt-4 relative inline-block">
                  <img
                    src={URL.createObjectURL(formData.studentPhoto)}
                    alt="Certificate Preview"
                    className="w-32 h-32 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                  />
                  {/* Close/Remove button */}
                  <button
                    type="button"
                    onClick={() => {
                      setPreviews(
                        "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                      );
                      setFormData((prev) => ({
                        ...prev,
                        studentPhoto: null,
                      }));
                    }}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 dark:hover:bg-black/90"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
          </div>
        </section>

        {/* Place of Birth */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Place of Birth:
          </label>
        </div>
        <div className="flex justify-between">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
              Select Your Region
            </label>
            <div className="relative">
              <select
                name="placeOfBirthRegionCode"
                value={formData.placeOfBirthRegionCode}
                onChange={handleRegionChange}
                className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Choose Region</option>
                {dropdowns.regions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
              Select Your Zone
            </label>
            <div className="relative">
              <select
                name="placeOfBirthZoneCode"
                value={formData.placeOfBirthZoneCode}
                onChange={handleZoneChange}
                disabled={!formData.placeOfBirthRegionCode}
                className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50"
              >
                <option value="">Choose Zone</option>
                {dropdowns.birthZones.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
              Select Your Woreda{" (Town)"}
            </label>
            <div className="relative">
              <select
                name="placeOfBirthWoredaCode"
                value={formData.placeOfBirthWoredaCode}
                onChange={handleInputChange}
                disabled={!formData.placeOfBirthZoneCode}
                className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50"
              >
                <option value="">Choose Woreda</option>
                {dropdowns.birthWoredas.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Date of Birth */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Date of Birth:
          </label>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                Ethiopian Calendar (E.C)
              </label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="birthDateEC"
                  placeholder="Date"
                  value={formData.birthDateEC}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="birthMonthEC"
                  placeholder="Month"
                  value={formData.birthMonthEC}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="birthYearEC"
                  placeholder="Year"
                  value={formData.birthYearEC}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                Gregorian Calendar (G.C) *
              </label>
              <input
                type="date"
                name="birthDateGC"
                value={formData.birthDateGC}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Current Residential Address */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Current Residential Address:
          </label>
          <div className="flex justify-between">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
                Select Your Region
              </label>
              <div className="relative">
                <select
                  name="currentAddressRegionCode"
                  value={formData.currentAddressRegionCode}
                  onChange={handleCurrentRegionChange}
                  className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Choose Region</option>
                  {dropdowns.regions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
                Select Your Zone
              </label>
              <div className="relative">
                <select
                  name="currentAddressZoneCode"
                  value={formData.currentAddressZoneCode}
                  onChange={handleCurrentZoneChange}
                  disabled={!formData.currentAddressRegionCode}
                  className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50"
                >
                  <option value="">Choose Zone</option>
                  {dropdowns.currentZones.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
                Select Your Woreda{" (Town)"}
              </label>
              <div className="relative">
                <select
                  name="currentAddressWoredaCode"
                  value={formData.currentAddressWoredaCode}
                  onChange={handleInputChange}
                  disabled={!formData.currentAddressZoneCode}
                  className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50"
                >
                  <option value="">Choose Woreda</option>
                  {dropdowns.currentWoredas.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marital Status */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Marital Status:
          </label>
          <div className="flex flex-wrap gap-4">
            {["Single", "Married", "Divorced", "Separated"].map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="radio"
                  name="maritalStatus"
                  value={status}
                  checked={formData.maritalStatus === status}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {status}
              </label>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Contact Person in case of Emergency: (Optional)
          </label>
          <div className="space-y-4">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Full Name (English):
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="emergencyfirstName"
                    value={formData.emergencyfirstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="emergencylastName"
                    value={formData.emergencylastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Full Name (Amharic):
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="emergencyfirstNameAMH"
                    value={formData.emergencyfirstNameAMH}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="emergencylastNameAMH"
                    value={formData.emergencylastNameAMH}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Contact Person Information
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                    Contact Person Relation
                  </label>
                  <input
                    type="text"
                    name="contactPersonRelation"
                    value={formData.contactPersonRelation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                    Contact Person Phone Number
                  </label>
                  <input
                    type="text"
                    name="contactPersonPhoneNumber"
                    value={formData.contactPersonPhoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            User Contact Information:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                Phone No.
              </label>
              <input
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FamilyBackgroundStep = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* <CHANGE> Added step title and description */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Family Background
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please provide information about your parents.
        </p>
      </div>

      <section className="border-2 border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          3. FAMILY BACKGROUND
        </h3>

        {/* Mother Information */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Mothers Full Name (English): *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="motherFirstName"
                value={formData.motherFirstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="motherLastName"
                value={formData.motherLastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Mothers Full Name (AMH): *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="motherFirstNameAMH"
                value={formData.motherFirstNameAMH}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="motherLastNameAMH"
                value={formData.motherLastNameAMH}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const EducationalInformationStep = ({ formData, setFormData, dropdowns }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [previews, setPreviews] = useState(
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
  );

  // Instruction mapping based on school background
  const getInstructions = (schoolBackgroundId) => {
    const instructions = {
      "1": {
        // High School Graduate
        title: "High School Graduate Certificate Requirements",
        content: [
          "• 8th Grade Certificate",
          "• 12th Grade National Exam Certificate",
          "• If you have multiple certificates, please combine them into a single PDF file before uploading",
        ],
      },
      "2": {
        // College Diploma
        title: "College Diploma Certificate Requirements",
        content: [
          "• Grade 12 Certificate",
          "• College Diploma Certificate",
          "• If you have multiple certificates, please combine them into a single PDF file before uploading",
        ],
      },
      "3": {
        // College Degree
        title: "College Degree Certificate Requirements",
        content: [
          "• Grade 12 Certificate",
          "• College Degree Certificate",
          "• If you have multiple certificates, please combine them into a single PDF file before uploading",
        ],
      },
      "4": {
        // Level IV
        title: "Level IV Certificate Requirements",
        content: [
          "• Grade 12 Certificate",
          "• Level IV Certificate",
          "• If you have multiple certificates, please combine them into a single PDF file before uploading",
        ],
      },
      "5": {
        // Masters Degree
        title: "Masters Degree Certificate Requirements",
        content: [
          "• Grade 12 Certificate",
          "• Bachelor's Degree Certificate",
          "• Masters Degree Certificate",
          "• If you have multiple certificates, please combine them into a single PDF file before uploading",
        ],
      },
    };
    return instructions[schoolBackgroundId] || null;
  };

  const currentInstructions = getInstructions(formData.schoolBackgroundId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleNestedChange = (section, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleGradeChange = (schoolIndex, grade, checked) => {
    const [previews, setPreviews] = useState(
      "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
    );
    setFormData((prev) => ({
      ...prev,
      schools: prev.schools.map((school, i) =>
        i === schoolIndex
          ? { ...school, grades: { ...school.grades, [grade]: checked } }
          : school
      ),
    }));
  };
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviews(imageURL);
      const img = new Image();
      img.src = imageURL;
      img.onload = () => URL.revokeObjectURL(imageURL);
    }
  }
  return (
    <div className="space-y-6">
      {/* <CHANGE> Added step title and description */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Educational Information
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please provide details about your educational background.
        </p>
      </div>

      <section className="border-2 border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          4. EDUCATIONAL INFORMATION
        </h3>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
            Select School Background *
          </label>
          <div className="relative">
            <select
              name="schoolBackgroundId"
              value={formData.schoolBackgroundId}
              onChange={handleInputChange}
              className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Choose Background</option>
              {dropdowns.schoolBackgrounds.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-100">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <section className="border-2 border-blue-200 rounded-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
          <div className="border-t-2 border-blue-400 pt-4 flex flex-col items-center">
            {/* Certificate Icon/Image */}
            <img
              src="/assets/certificate.png" // replace with your image path
              alt="Certificate Icon"
              className="w-24 h-24 mb-4"
            />

            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Please Upload Your Certificate (Optional)
            </h3>
            <div className="text-sm font-medium text-gray-600 mb-4 text-center">
              {currentInstructions ? (
                <div className="flex items-center justify-center gap-2">
                  <span>Upload your certificates below:</span>
                  <button
                    type="button"
                    onClick={() => setShowInstructions(!showInstructions)}
                    className="text-blue-600 hover:text-blue-800 underline cursor-pointer transition-colors duration-200"
                  >
                    Read Instructions
                  </button>
                </div>
              ) : (
                <span>
                  Please select your school background first to see upload
                  instructions
                </span>
              )}
            </div>

            {/* Instruction Dropdown */}
            {currentInstructions && showInstructions && (
              <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                    {currentInstructions.title}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowInstructions(false)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  {currentInstructions.content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Certificate uploader */}
            <div className="flex items-center gap-3">
              {/* Hidden input */}
              <input
                id="upload-certificate"
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData((prev) => ({
                      ...prev,
                      document: file,
                    }));
                  }
                }}
                className="hidden"
              />

              {/* Custom upload button */}
              <label
                htmlFor="upload-certificate"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow cursor-pointer hover:from-blue-700 hover:to-blue-800 transition"
              >
                <ImageIcon className="w-5 h-5" />
                <span>Upload Certificate</span>
              </label>

              {/* File name */}
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {formData.document ? formData.document.name : "No file chosen"}
              </span>
            </div>

            {/* Preview (for images and PDF files) */}
            {formData.document && formData.document instanceof File && (
              <div className="mt-3 relative inline-block">
                {formData.document.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(formData.document)}
                    alt="Certificate Preview"
                    className="w-32 h-32 object-cover rounded-md border"
                  />
                ) : formData.document.type === "application/pdf" ? (
                  <div className="w-32 h-32 bg-red-100 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-md flex flex-col items-center justify-center">
                    <svg
                      className="w-8 h-8 text-red-600 dark:text-red-400 mb-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                      PDF
                    </span>
                  </div>
                ) : null}
                {/* Close/Remove button */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      document: null,
                    }))
                  }
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
            Select Your Department *
          </label>
          <div className="relative">
            <select
              name="departmentEnrolledId"
              value={formData.departmentEnrolledId}
              onChange={handleInputChange}
              className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Choose Department</option>
              {dropdowns.departments.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-100">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
            Select Program Modality *
          </label>
          <div className="relative">
            <select
              name="programModalityCode"
              value={formData.programModalityCode}
              onChange={handleInputChange}
              className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Choose Modality</option>
              {dropdowns.programModalities.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-100">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
            Select Class Year *
          </label>
          <div className="relative">
            <select
              name="classYearId"
              value={formData.classYearId}
              onChange={handleInputChange}
              className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Choose Class Year</option>
              {dropdowns.classYears.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-100">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
            Select Semester *
          </label>
          <div className="relative">
            <select
              name="semesterCode"
              value={formData.semesterCode}
              onChange={handleInputChange}
              className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Choose Semester</option>
              {dropdowns.semesters.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-100">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const EmploymentInformationStep = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (section, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  return (
    <div className="space-y-6">
      {/* <CHANGE> Added step title and description */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Employment Information
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please provide details about your current and past employment.
        </p>
      </div>

      <section className="border-2 border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          4. EMPLOYMENT
        </h3>

        {/* Current Employment */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Are You Currently Employed?
          </label>
          <div className="flex gap-4 mb-4">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="currentlyEmployed"
                  value={option}
                  checked={formData.currentlyEmployed === option}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          {formData.currentlyEmployed === "Yes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                  Employer
                </label>
                <input
                  type="text"
                  name="currentEmployer"
                  value={formData.currentEmployer}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                  Type of Job
                </label>
                <input
                  type="text"
                  name="currentJobType"
                  value={formData.currentJobType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="currentEmployerAddress"
                  value={formData.currentEmployerAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                  Telephone
                </label>
                <input
                  type="tel"
                  name="currentEmployerPhone"
                  value={formData.currentEmployerPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Employment History */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            List at least three employments:
          </label>
          <div className="space-y-4">
            {formData.employmentHistory.map((employment, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border border-gray-200 rounded-md"
              >
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                    Type of work
                  </label>
                  <input
                    type="text"
                    value={employment.type}
                    onChange={(e) =>
                      handleNestedChange(
                        "employmentHistory",
                        index,
                        "type",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                    Employer
                  </label>
                  <input
                    type="text"
                    value={employment.employer}
                    onChange={(e) =>
                      handleNestedChange(
                        "employmentHistory",
                        index,
                        "employer",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                    P.O Box
                  </label>
                  <input
                    type="text"
                    value={employment.poBox}
                    onChange={(e) =>
                      handleNestedChange(
                        "employmentHistory",
                        index,
                        "poBox",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  {" "}
                  <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                    Telephone
                  </label>
                  <input
                    type="tel"
                    value={employment.telephone}
                    onChange={(e) =>
                      handleNestedChange(
                        "employmentHistory",
                        index,
                        "telephone",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                    Service Year
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="From"
                      value={employment.yearFrom}
                      onChange={(e) =>
                        handleNestedChange(
                          "employmentHistory",
                          index,
                          "yearFrom",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="To"
                      value={employment.yearTo}
                      onChange={(e) =>
                        handleNestedChange(
                          "employmentHistory",
                          index,
                          "yearTo",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ReviewSubmitStep = ({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}) => {
  const [applicantName, setApplicantName] = useState("");
  const [applicantSignature, setApplicantSignature] = useState("");
  const [submissionDate, setSubmissionDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const finalData = {
        ...formData,
      };
      console.log(finalData);
      await onSubmit(finalData);
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  return (
    <div className="space-y-6">
      {/* <CHANGE> Added step title and description */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Review & Submit
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please review your information and complete the declaration.
        </p>
      </div>

      {/* Summary Section */}
      <section className="border-2 border-gray-200 rounded-lg p-6">
        <h3 className="text-lg text-center font-semibold text-gray-800 dark:text-white mb-4">
          Application Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col justify-around">
            <span className="font-medium">
              Name: {formData.firstName}
              {formData.middleName} {formData.lastName}
            </span>
            <div>
              <span className="font-medium">Study Choice:</span>{" "}
              {formData.studyChoice}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-6">
              <span className="font-medium">Photo:</span>
              <img
                className="w-24 h-24 rounded-full mb-4"
                src={formData.prevPhoto}
              />
            </div>
            {/* <span className="font-medium">Email:</span> {formData.email} */}
          </div>
          <div>
            <span className="font-medium">Email:</span> {formData.email}
          </div>
          <div>
            <span className="font-medium">Phone:</span> {formData.phoneNo}
          </div>
        </div>
      </section>

      {/* Statement by Applicant */}
      <section className="border-2 border-gray-200  rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          6. STATEMENT BY THE APPLICANT
        </h3>
        <div className=" p-4 rounded-md mb-6">
          <p className="text-sm text-gray-800 dark:text-white leading-relaxed">
            Are you sure you want to submit this form? Please confirm that all
            information provided is correct.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`font-semibold py-3 px-8 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isSubmitting
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                "Submit Registration Form"
              )}
            </button>
          </div>
        </form>
      </section>

      {/* Office Use Only */}
      {/* <section className="border-2 border-red-200 rounded-lg p-6 bg-red-50">
        <div className="border-t-2 border-red-400 pt-4">
          <h3 className="text-lg font-semibold text-red-800 mb-4">
            DO NOT WRITE BELOW THIS LINE
          </h3>
          <p className="text-sm font-medium text-red-700 mb-4">
            Office personnel accepting this form:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-red-600 mb-1">Name:</label>
              <div className="w-full h-10 border-b-2 border-red-300"></div>
            </div>
            <div>
              <label className="block text-xs text-red-600 mb-1">
                Signature:
              </label>
              <div className="w-full h-10 border-b-2 border-red-300"></div>
            </div>
            <div>
              <label className="block text-xs text-red-600 mb-1">Date:</label>
              <div className="w-full h-10 border-b-2 border-red-300"></div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

// Progress Indicator Component
const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    "Personal Information",
    "Family Background",
    "Educational Information",
    // "Employment Information",
    "Review & Submit",
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index + 1 <= currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600 dark:text-gray-300"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`ml-2 text-sm ${
                index + 1 <= currentStep
                  ? "text-blue-600 font-medium"
                  : "text-gray-500 dark:text-gray-100"
              } hidden md:inline`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-8 md:w-16 h-0.5 mx-2 ${
                  index + 1 < currentStep ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-gray-600 dark:text-gray-300">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

// Main Multi-Step Form Component
const MultiStepRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // <CHANGE> Added initial form data structure with localStorage persistence
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("registrationFormData");
    return saved
      ? JSON.parse(saved)
      : {
          // Application type
          // admissionType: "",

          // Personal Data
          firstName: "",
          firstNameAMH: "",
          middleName: "",
          middleNameAMH: "",
          lastName: "",
          lastNameAMH: "",
          sex: "",
          age: "",
          visionImpairment: "",
          hearingImpairment: "",
          otherImpairment: "",

          // Birth Information
          birthTown: "",
          birthWoreda: "",
          birthZone: "",
          birthRegion: "",
          birthDateEC: "",
          birthMonthEC: "",
          birthYearEC: "",
          birthDateGC: "",
          birthMonthGC: "",
          birthYearGC: "",

          // Current Address
          currentRegion: "",
          currentZone: "",
          currentWoreda: "",
          currentSubCity: "",
          currentKebele: "",
          currentHouseNo: "",
          // poBox: "",
          email: "",
          phoneNo: "",

          // Dropdown submit values (codes/ids)
          impairmentCode: "",
          departmentEnrolledId: "",
          programModalityCode: "",
          schoolBackgroundId: "",
          classYearId: "",
          semesterCode: "",

          // Geographic codes
          placeOfBirthRegionCode: "",
          placeOfBirthZoneCode: "",
          placeOfBirthWoredaCode: "",
          currentAddressRegionCode: "",
          currentAddressZoneCode: "",
          currentAddressWoredaCode: "",

          // Marital Status
          maritalStatus: "",

          // Family Background
          motherFirstName: "",
          motherFirstNameAMH: "",
          motherLastName: "",
          motherLastNameAMH: "",

          // Emergency Contact
          emergencyfirstName: "",
          emergencylastName: "",
          emergencyfirstNameAMH: "",
          emergencylastNameAMH: "",
        };
  });

  // <CHANGE> Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("registrationFormData", JSON.stringify(formData));
  }, [formData]);

  // <CHANGE> Save current step to localStorage
  useEffect(() => {
    localStorage.setItem("registrationCurrentStep", currentStep.toString());
  }, [currentStep]);

  // <CHANGE> Load current step from localStorage on mount
  useEffect(() => {
    const savedStep = localStorage.getItem("registrationCurrentStep");
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, []);

  const nextStep = () => {
    // Allow advancing unless we're already at the final step
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
    }
  };
  // Dropdown options
  const [dropdowns, setDropdowns] = useState({
    departments: [],
    impairments: [],
    semesters: [],
    schoolBackgrounds: [],
    programModalities: [],
    classYears: [],
    regions: [],
    birthZones: [],
    birthWoredas: [],
    currentZones: [],
    currentWoredas: [],
  });

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [
          departments,
          impairments,
          semesters,
          schoolBackgrounds,
          programModalities,
          classYears,
          regions,
        ] = await Promise.all([
          apiService.get(endPoints.departments),
          apiService.get(endPoints.impairments),
          apiService.get(endPoints.semesters),
          apiService.get(endPoints.schoolBackgrounds),
          apiService.get(endPoints.programModality),
          apiService.get(endPoints.classYears),
          apiService.get(endPoints.regions),
        ]);

        setDropdowns((prev) => ({
          ...prev,
          departments: (departments || []).map((d) => ({
            value: d.dptID,
            label: d.deptName,
          })),
          impairments: (impairments || []).map((i) => ({
            value: i.impairmentCode,
            label: i.impairment,
          })),
          semesters: (semesters || []).map((s) => ({
            value: s.academicPeriodCode,
            label: s.academicPeriod,
          })),
          schoolBackgrounds: (schoolBackgrounds || []).map((b) => ({
            value: b.id,
            label: b.background,
          })),
          programModalities: (programModalities || []).map((m) => ({
            value: m.modalityCode,
            label: m.modality,
          })),
          classYears: (classYears || []).map((y) => ({
            value: y.id,
            label: y.classYear,
          })),
          regions: (regions || []).map((r) => ({
            value: r.regionCode,
            label: r.region,
          })),
        }));
      } catch (err) {
        setDropdowns((prev) => ({
          ...prev,
          departments: [],
          impairments: [],
          semesters: [],
          schoolBackgrounds: [],
          programModalities: [],
          classYears: [],
          regions: [],
        }));
      }
    };
    loadDropdowns();
  }, []);

  // Cascading dropdown functions
  const fetchZonesByRegion = async (regionCode, target) => {
    try {
      const zones = await apiService.get(
        `${endPoints.zonesByRegion}/${regionCode}`
      );
      setDropdowns((prev) => ({
        ...prev,
        ...(target === "birth"
          ? {
              birthZones: (zones || []).map((z) => ({
                value: z.zoneCode,
                label: z.zone,
              })),
              birthWoredas: [],
            }
          : {
              currentZones: (zones || []).map((z) => ({
                value: z.zoneCode,
                label: z.zone,
              })),
              currentWoredas: [],
            }),
      }));
    } catch (err) {
      setDropdowns((prev) => ({
        ...prev,
        ...(target === "birth"
          ? { birthZones: [], birthWoredas: [] }
          : { currentZones: [], currentWoredas: [] }),
      }));
    }
  };

  const fetchWoredasByZone = async (zoneCode, target) => {
    try {
      const woredas = await apiService.get(
        `${endPoints.woredasByZone}/${zoneCode}`
      );
      setDropdowns((prev) => ({
        ...prev,
        ...(target === "birth"
          ? {
              birthWoredas: (woredas || []).map((w) => ({
                value: w.woredaCode,
                label: w.woreda,
              })),
            }
          : {
              currentWoredas: (woredas || []).map((w) => ({
                value: w.woredaCode,
                label: w.woreda,
              })),
            }),
      }));
    } catch (err) {
      setDropdowns((prev) => ({
        ...prev,
        ...(target === "birth" ? { birthWoredas: [] } : { currentWoredas: [] }),
      }));
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    const formDataObj = new FormData();
    const nullIfEmpty = (v) =>
      v === undefined || v === null || String(v).trim() === "" ? null : v;
    const intOrNull = (v) => {
      const n = parseInt(v, 10);
      return Number.isFinite(n) ? n : null;
    };
    const safeUpper = (v) => (v ? String(v).toUpperCase() : null);
    const dateOrNull = (y, m, d) => (y && m && d ? `${y}-${m}-${d}` : null);

    const rawBody = {
      firstNameAMH: nullIfEmpty(formData.firstNameAMH),
      firstNameENG: nullIfEmpty(formData.firstName),
      // Father name extracted from student's middle name
      fatherNameAMH: nullIfEmpty(formData.middleNameAMH),
      fatherNameENG: nullIfEmpty(formData.middleName),
      // Grandfather name - using last name as grandfather name
      grandfatherNameAMH: nullIfEmpty(formData.lastNameAMH),
      grandfatherNameENG: nullIfEmpty(formData.lastName),
      motherNameAMH: nullIfEmpty(formData.motherFirstNameAMH),
      motherNameENG: nullIfEmpty(formData.motherFirstName),
      // Mother's father name - using mother's last name as her father's name
      motherFatherNameAMH: nullIfEmpty(formData.motherLastNameAMH),
      motherFatherNameENG: nullIfEmpty(formData.motherLastName),
      gender: formData.sex
        ? formData.sex === "Male"
          ? "MALE"
          : "FEMALE"
        : null,
      age: intOrNull(formData.age),
      phoneNumber: nullIfEmpty(formData.phoneNo),
      dateOfBirthEC: dateOrNull(
        formData.birthYearEC,
        formData.birthMonthEC,
        formData.birthDateEC
      ),
      dateOfBirthGC: formData.birthDateGC || null,
      placeOfBirthWoredaCode: nullIfEmpty(formData.placeOfBirthWoredaCode),
      placeOfBirthZoneCode: nullIfEmpty(formData.placeOfBirthZoneCode),
      placeOfBirthRegionCode: nullIfEmpty(formData.placeOfBirthRegionCode),
      currentAddressWoredaCode: nullIfEmpty(formData.currentAddressWoredaCode),
      currentAddressZoneCode: nullIfEmpty(formData.currentAddressZoneCode),
      currentAddressRegionCode: nullIfEmpty(formData.currentAddressRegionCode),
      email: nullIfEmpty(formData.email),
      maritalStatus: safeUpper(formData.maritalStatus),
      impairmentCode: nullIfEmpty(formData.impairmentCode),
      schoolBackgroundId: intOrNull(formData.schoolBackgroundId),
      contactPersonFirstNameAMH: nullIfEmpty(formData.emergencyfirstNameAMH),
      contactPersonFirstNameENG: nullIfEmpty(formData.emergencyfirstName),
      contactPersonLastNameAMH: nullIfEmpty(formData.emergencylastNameAMH),
      contactPersonLastNameENG: nullIfEmpty(formData.emergencylastName),
      contactPersonPhoneNumber: nullIfEmpty(formData.contactPersonPhoneNumber),
      contactPersonRelation: nullIfEmpty(formData.contactPersonRelation),
      departmentEnrolledId: intOrNull(formData.departmentEnrolledId),
      programModalityCode: nullIfEmpty(formData.programModalityCode),
      classYearId: intOrNull(formData.classYearId),
      semesterCode: nullIfEmpty(formData.semesterCode),
    };
    // Remove null fields to avoid backend complaints for missing/optional values
    const body = Object.fromEntries(
      Object.entries(rawBody).filter(([_, v]) => v !== null)
    );

    try {
      // Append the JSON string as the 'data' part
      formDataObj.append(
        "data",
        new Blob([JSON.stringify(body)], { type: "application/json" })
      );

      // Append file uploads if they exist
      if (formData.studentPhoto && formData.studentPhoto instanceof File) {
        formDataObj.append("studentPhoto", formData.studentPhoto);
      }

      if (formData.document && formData.document instanceof File) {
        formDataObj.append("document", formData.document);
      }

      const response = await apiService.post(endPoints.applicants, formDataObj);

      console.log("Response:", response.data);
      console.log("Form submitted:", body);

      // Clear localStorage on successful submission
      localStorage.removeItem("registrationFormData");
      localStorage.removeItem("registrationCurrentStep");
      setErrorMessage("");
      alert("Registration form submitted successfully!");

      return response.data;
    } catch (error) {
      console.error("Submission error:", error);

      // Extract error message from different possible error structures
      let errorMsg = "An unexpected error occurred. Please try again.";

      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;

        if (status === 400) {
          errorMsg =
            data?.message ||
            data?.error ||
            "Invalid data provided. Please check your information and try again.";
        } else if (status === 401) {
          errorMsg =
            "Authentication failed. Please refresh the page and try again.";
        } else if (status === 403) {
          errorMsg =
            "Access denied. You don't have permission to perform this action.";
        } else if (status === 404) {
          errorMsg = "Service not found. Please contact support.";
        } else if (status === 409) {
          errorMsg =
            "A record with this information already exists. Please check your details.";
        } else if (status === 422) {
          errorMsg =
            data?.message ||
            "Validation error. Please check all required fields are filled correctly.";
        } else if (status === 500) {
          errorMsg = "Server error. Please try again later or contact support.";
        } else {
          errorMsg =
            data?.message || `Server error (${status}). Please try again.`;
        }
      } else if (error.request) {
        // Network error
        errorMsg =
          "Network error. Please check your internet connection and try again.";
      } else {
        // Other error
        errorMsg =
          error.message || "An unexpected error occurred. Please try again.";
      }

      setErrorMessage(errorMsg);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  const isStepValid = (step, formData) => {
    switch (step) {
      case 1:
        // Be lenient on Step 1 so users can proceed after core personal info
        return (
          !!formData.firstName &&
          !!formData.middleName &&
          !!formData.lastName &&
          !!formData.sex &&
          !!formData.phoneNo
        );
      case 2:
        return true;
      case 3:
        return true;
      // return formData.schools && formData.studyChoice;
      case 4:
        return true;
      // return formData.currentlyEmployed;
      default:
        return true;
    }
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInformationStep
            formData={formData}
            setFormData={setFormData}
            dropdowns={dropdowns}
            fetchZonesByRegion={fetchZonesByRegion}
            fetchWoredasByZone={fetchWoredasByZone}
          />
        );
      case 2:
        return (
          <FamilyBackgroundStep formData={formData} setFormData={setFormData} />
        );
      case 3:
        return (
          <EducationalInformationStep
            formData={formData}
            setFormData={setFormData}
            dropdowns={dropdowns}
          />
        );
      case 4:
        return (
          <ReviewSubmitStep
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );

      default:
        return (
          <PersonalInformationStep
            formData={formData}
            setFormData={setFormData}
            dropdowns={dropdowns}
            fetchZonesByRegion={fetchZonesByRegion}
            fetchWoredasByZone={fetchWoredasByZone}
          />
        );
    }
  };

  return (
    // <div className="w-full mx-auto p-6 bg-white dark:bg-black">
    <div>
      <header className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <img src="/assets/companylogo.jpg" className="h-[50px] w-full" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              DEUTSCHE HOCHSCHULE FÜR MEDIZIN COLLEGE
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>
      <div className="relative min-h-screen  bg-gray-50 dark:bg-gray-900 px-6 md:px-16 lg:px-28 overflow-auto overflow-x-hidden">
        {/* <div className="hidden dark:block fixed inset-0">
        <DarkVeil className="w-full h-full object-cover" />
      </div> */}
        <div className="relative z-10">
          {/* <CHANGE> Added header with form title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Registrar Office
            </h1>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white dark:text-gray-200 mb-4">
              LIFE HISTORY FORM, UNDERGRADUATE PROGRAM
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              This form, completed and accompanied by all necessary education
              documents, must be returned to the Registrar's Office on or before
              the end of the registration date declared by the Registrar of the
              College.
            </p>
          </div>

          {/* <CHANGE> Added progress indicator */}
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />

          {/* Error Message Display */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Registration Error
                  </h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    <p>{errorMessage}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setErrorMessage("")}
                      className="bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-200 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* <CHANGE> Render current step */}
          {renderStep()}

          {/* <CHANGE> Added navigation buttons */}
          {currentStep <= totalSteps && (
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${
                  currentStep === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                }`}
              >
                Previous
              </button>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "registrationFormData",
                      JSON.stringify(formData)
                    );
                    alert("Progress saved!");
                  }}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Save Progress
                </button>

                {currentStep < totalSteps && (
                  <button
                    onClick={nextStep}
                    className={`px-6 py-2 rounded-lg font-medium transition duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <div
          id="contact"
          className="relative w-full mt-5 flex items-center justify-center overflow-hidden"
        >
          {/* Light rays absolutely positioned behind content */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1}
              lightSpread={1}
              rayLength={2}
              pulsating={true}
              fadeDistance={1}
              saturation={1}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              className="w-full h-full"
            />
          </div>
          {/* <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12"> */}

          <footer className="text-white py-1">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 rounded-full   rounded-lg flex items-center justify-center">
                      <img
                        src="/assets/companylogo.jpg"
                        className="h-[50px] w-full rounded-full "
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">some</h3>
                      <p className="text-sm text-">thing</p>
                    </div>
                  </div>
                  <p className="text-gray-400">
                    Excellence in medical education since 1985.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-black">
                    <li>
                      <Link
                        to="/register"
                        className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                      >
                        Apply Now
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                      >
                        Student Portal
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                      >
                        Programs
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                      >
                        Research
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">something</h4>
                  <ul className="space-y-2 ">
                    <li className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400">
                      123 Medical Campus Drive
                    </li>
                    <li className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400">
                      Berlin, Germany 10115
                    </li>
                    <li className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400">
                      +49 30 1234 5678
                    </li>
                    <li className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400">
                      info@dhfm-college.de
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">Facebook</span>📘
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">Twitter</span>🐦
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">LinkedIn</span>💼
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>
                  &copy; 2024 DEUTSCHE HOCHSCHULE FÜR MEDIZIN COLLEGE. All
                  rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MultiStepRegistrationForm;
