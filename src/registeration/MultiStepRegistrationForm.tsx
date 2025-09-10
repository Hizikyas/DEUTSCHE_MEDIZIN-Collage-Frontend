import React, { useState, useEffect } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, X, User } from "lucide-react";
import LightRays from "@/designs/LightRays";
import { useTranslation } from "react-i18next";
import Select from "react-select";
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
const PersonalInformationStep = ({ formData, setFormData }) => {
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
      : countries.filter((c) => c.toLowerCase().includes(query.toLowerCase()));
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

      {/* 1. APPLICATION */}
      {/* <section className="border-2 border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          1. APPLICATION
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admission:
          </label>
          <div className="flex gap-6">
            {["Regular", "Extension", "Summer"].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="admissionType"
                  value={type}
                  checked={formData.admissionType === type}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </section> */}

      {/* 2. PERSONAL DATA */}
      <section className="border-2 border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          1. PERSONAL DATA
        </h3>

        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Full Name (English):
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-white mb-1">
                First Name
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
              <label className="block text-xs text-gray-500 text-white mb-1">
                Middle Name
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
              <label className="block text-xs text-gray-500 text-white mb-1">
                Last Name
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
            Full Name (Amharic):
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-white mb-1">
                First Name
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
                Middle Name
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
                Last Name
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
              Sex:
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
              Age:
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

        {/* Impairment Information */}
        {/* <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Information about Impairment (if any):
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Vision:
              </label>
              <input
                type="text"
                name="visionImpairment"
                value={formData.visionImpairment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Hearing:
              </label>
              <input
                type="text"
                name="hearingImpairment"
                value={formData.hearingImpairment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Any other:
              </label>
              <input
                type="text"
                name="otherImpairment"
                value={formData.otherImpairment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div> */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Information about Impairment (if any):
          </label>
          <select
            name="impairmentType"
            value={formData.impairmentType}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Impairment</option>
            <option value="None">None</option>
            <option value="Vision">Vision</option>
            <option value="Hearing">Hearing</option>
            <option value="Physical">Physical</option>
            <option value="Cognitive">Cognitive</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
          Student Photo
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
                  const file = e.target.files[0];
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
                      setPreviews(null);
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
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Town</label>
              <input
                type="text"
                name="birthTown"
                value={formData.birthTown}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Woreda</label>
              <input
                type="text"
                name="birthWoreda"
                value={formData.birthWoreda}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Zone</label>
              <input
                type="text"
                name="birthZone"
                value={formData.birthZone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Region</label>
              <input
                type="text"
                name="birthRegion"
                value={formData.birthRegion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div> */}
        </div>
        <div className="flex justify-between">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
              Select Your Woreda{" (Town)"}
            </label>
            <div className="relative">
              {/* <select
                name="birthWoreda"
                value={formData.birthWoreda}
                onChange={handleInputChange}
                className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
              >
                <option value="Regular">Regular</option>
                <option value="Extension/Weekend">Extension/Weekend</option>
                <option value="Summer">Summer</option>
                <option value="Distance">Distance</option>
                <option value="Winter In-service">Winter In-service</option>
                <option value="Daytime">Daytime</option>
              </select> */}
              <Select
                options={countries}
                isSearchable
                placeholder="Select a country..."
                onChange={(selected) => console.log(selected)}
                // components={{ DropdownIndicator: null }} // ✅ removes the arrow
                classNames={{
                  control: ({ isFocused }) =>
                    `rounded-lg border px-2 py-1 shadow-sm transition-all ${
                      isFocused
                        ? "border-blue-400 ring-2 ring-blue-300"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-black`,
                  placeholder: () =>
                    "text-gray-500 dark:text-white font-medium",
                  input: () => "text-black dark:text-white",

                  dropdownIndicator: ({ isFocused }) => `text-transparent`,
                  singleValue: () =>
                    "text-gray-800 dark:text-gray-100 font-semibold",
                  menu: () =>
                    "mt-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-lg",
                  option: ({ isFocused, isSelected }) =>
                    `px-3 py-2 cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white dark:bg-blue-600"
                        : isFocused
                        ? "bg-blue-100 dark:bg-black"
                        : "text-gray-800 dark:text-gray-200"
                    }`,
                }}
              />

              {/* Dropdown arrow */}
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
              <Select
                options={countries}
                isSearchable
                placeholder="Select a country..."
                onChange={(selected) => console.log(selected)}
                // components={{ DropdownIndicator: null }} // ✅ removes the arrow
                classNames={{
                  control: ({ isFocused }) =>
                    `rounded-lg border px-2 py-1 shadow-sm transition-all ${
                      isFocused
                        ? "border-blue-400 ring-2 ring-blue-300"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-black`,
                  placeholder: () =>
                    "text-gray-500 dark:text-white font-medium",
                  input: () => "text-black dark:text-white",

                  dropdownIndicator: ({ isFocused }) => `text-transparent`,
                  singleValue: () =>
                    "text-gray-800 dark:text-gray-100 font-semibold",
                  menu: () =>
                    "mt-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-lg",
                  option: ({ isFocused, isSelected }) =>
                    `px-3 py-2 cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white dark:bg-blue-600"
                        : isFocused
                        ? "bg-blue-100 dark:bg-black"
                        : "text-gray-800 dark:text-gray-200"
                    }`,
                }}
              />

              {/* <select
                name="birthZone"
                value={formData.birthZone}
                onChange={handleInputChange}
                className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
              >
                <option value="Regular">Regular</option>
                <option value="Extension/Weekend">Extension/Weekend</option>
                <option value="Summer">Summer</option>
                <option value="Distance">Distance</option>
                <option value="Winter In-service">Winter In-service</option>
                <option value="Daytime">Daytime</option>
              </select> */}

              {/* Dropdown arrow */}
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
              Select Your Region
            </label>
            <div className="relative">
              <Select
                options={countries}
                isSearchable
                placeholder="Select a country..."
                onChange={(selected) => console.log(selected)}
                // components={{ DropdownIndicator: null }} // ✅ removes the arrow
                classNames={{
                  control: ({ isFocused }) =>
                    `rounded-lg border px-2 py-1 shadow-sm transition-all ${
                      isFocused
                        ? "border-blue-400 ring-2 ring-blue-300"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-black`,
                  placeholder: () =>
                    "text-gray-500 dark:text-white font-medium",
                  input: () => "text-black dark:text-white",
                  dropdownIndicator: ({ isFocused }) => `text-transparent`,
                  singleValue: () =>
                    "text-gray-800 dark:text-white font-semibold",
                  menu: () =>
                    "mt-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-lg",
                  option: ({ isFocused, isSelected }) =>
                    `px-3 py-2 cursor-pointer ${
                      isSelected
                        ? "dark:bg-black bg-white dark:text-white"
                        : isFocused
                        ? "bg-blue-100 dark:bg-black"
                        : "text-black dark:text-white"
                    }`,
                }}
              />

              {/* Dropdown arrow */}
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
                Gregorian Calendar (G.C)
              </label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="birthDateGC"
                  placeholder="Date"
                  value={formData.birthDateGC}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="birthMonthGC"
                  placeholder="Month"
                  value={formData.birthMonthGC}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="birthYearGC"
                  placeholder="Year"
                  value={formData.birthYearGC}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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
              <label className="block text-sm font-semibold text-gray-800 text-white mb-2">
                Select Your Woreda{" (Town)"}
              </label>
              <div className="relative">
                <Select
                  options={countries}
                  isSearchable
                  placeholder="Select a country..."
                  onChange={(selected) => console.log(selected)}
                  // components={{ DropdownIndicator: null }} // ✅ removes the arrow
                  classNames={{
                    control: ({ isFocused }) =>
                      `rounded-lg border px-2 py-1 shadow-sm transition-all ${
                        isFocused
                          ? "border-blue-400 ring-2 ring-blue-300"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-black`,
                    placeholder: () =>
                      "text-gray-500 dark:text-white font-medium",
                    input: () => "text-black dark:text-white",

                    dropdownIndicator: ({ isFocused }) => `text-transparent`,
                    singleValue: () =>
                      "text-gray-800 dark:text-gray-100 font-semibold",
                    menu: () =>
                      "mt-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-lg",
                    option: ({ isFocused, isSelected }) =>
                      `px-3 py-2 cursor-pointer ${
                        isSelected
                          ? "bg-blue-600 text-white dark:bg-blue-600"
                          : isFocused
                          ? "bg-blue-100 dark:bg-black"
                          : "text-gray-800 dark:text-gray-200"
                      }`,
                  }}
                />

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
                Select Your Zone
              </label>
              <div className="relative">
                <Select
                  options={countries}
                  isSearchable
                  placeholder="Select a country..."
                  onChange={(selected) => console.log(selected)}
                  // components={{ DropdownIndicator: null }} // ✅ removes the arrow
                  classNames={{
                    control: ({ isFocused }) =>
                      `rounded-lg border px-2 py-1 shadow-sm transition-all ${
                        isFocused
                          ? "border-blue-400 ring-2 ring-blue-300"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-black`,
                    placeholder: () =>
                      "text-gray-500 dark:text-white font-medium",
                    input: () => "text-black dark:text-white",

                    dropdownIndicator: ({ isFocused }) => `text-transparent`,
                    singleValue: () =>
                      "text-gray-800 dark:text-gray-100 font-semibold",
                    menu: () =>
                      "mt-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-lg",
                    option: ({ isFocused, isSelected }) =>
                      `px-3 py-2 cursor-pointer ${
                        isSelected
                          ? "bg-blue-600 text-white dark:bg-blue-600"
                          : isFocused
                          ? "bg-blue-100 dark:bg-black"
                          : "text-gray-800 dark:text-gray-200"
                      }`,
                  }}
                />

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
              <label className="block text-sm font-semibold text-gray-800 text-white mb-2">
                Select Your Region
              </label>
              <div className="relative">
                <Select
                  options={countries}
                  isSearchable
                  placeholder="Select a country..."
                  onChange={(selected) => console.log(selected)}
                  // components={{ DropdownIndicator: null }} // ✅ removes the arrow
                  classNames={{
                    control: ({ isFocused }) =>
                      `rounded-lg border px-2 py-1 shadow-sm transition-all ${
                        isFocused
                          ? "border-blue-400 ring-2 ring-blue-300"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-black`,
                    placeholder: () =>
                      "text-gray-500 dark:text-white font-medium",
                    input: () => "text-black dark:text-white",

                    dropdownIndicator: ({ isFocused }) => `text-transparent`,
                    singleValue: () =>
                      "text-gray-800 dark:text-gray-100 font-semibold",
                    menu: () =>
                      "mt-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-lg",
                    option: ({ isFocused, isSelected }) =>
                      `px-3 py-2 cursor-pointer ${
                        isSelected
                          ? "bg-blue-600 text-white dark:bg-blue-600"
                          : isFocused
                          ? "bg-blue-100 dark:bg-black"
                          : "text-gray-800 dark:text-gray-200"
                      }`,
                  }}
                />

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
          </div>
          {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Region</label>
              <input
                type="text"
                name="currentRegion"
                value={formData.currentRegion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Zone</label>
              <input
                type="text"
                name="currentZone"
                value={formData.currentZone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Woreda(Town)
              </label>
              <input
                type="text"
                name="currentWoreda"
                value={formData.currentWoreda}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div> */}
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
            Contact Person in case of Emergency:
          </label>
          <div className="space-y-4">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Full Name (English):
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="emergencymiddleName"
                    value={formData.emergencymiddleName}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="emergencymiddleNameAMH"
                    value={formData.emergencymiddleNameAMH}
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
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Relations
                </label>
                <input
                  type="text"
                  name="emergencyRelation"
                  value={formData.emergencyRelation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Relations
                </label>
                <input
                  type="text"
                  name="emergencyRelation"
                  value={formData.emergencyRelation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div> */}
            {/* <div>
              <label className="block text-xs text-gray-500 mb-1">
                Telephone:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="tel"
                  name="emergencyHomePhone"
                  placeholder="Home"
                  value={formData.emergencyHomePhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  name="emergencyOfficePhone"
                  placeholder="Office"
                  value={formData.emergencyOfficePhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  name="emergencyMobile"
                  placeholder="Mobile"
                  value={formData.emergencyMobile}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div> */}
            {/* <div>
              <label className="block text-xs text-gray-500 mb-1">
                Address:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="emergencyRegion"
                  placeholder="Region"
                  value={formData.emergencyRegion}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="emergencyZone"
                  placeholder="Zone"
                  value={formData.emergencyZone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="emergencyWoreda"
                  placeholder="Woreda/Town"
                  value={formData.emergencyWoreda}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="emergencySubCity"
                  placeholder="Sub-City"
                  value={formData.emergencySubCity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="emergencyKebele"
                  placeholder="Kebele"
                  value={formData.emergencyKebele}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="emergencyHouseNo"
                  placeholder="House No."
                  value={formData.emergencyHouseNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div> */}
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

        {/* Father Information */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Father Full Name (English):
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.fatherFirstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.fatherMiddleName}
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
                name="lastName"
                value={formData.fatherlastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Father Full Name (AMH):
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="fatherFirstNameAMH"
                value={formData.fatherFirstNameAMH}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="middleNameFatherNameAMH"
                value={formData.middleNameFatherNameAMH}
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
                name="fatherlastNameAMH"
                value={formData.fatherlastNameAMH}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="fatherRegion"
              placeholder="Region"
              value={formData.fatherRegion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="fatherZone"
              placeholder="Zone"
              value={formData.fatherZone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="fatherWoreda"
              placeholder="Woreda/Town"
              value={formData.fatherWoreda}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="fatherSubCity"
              placeholder="Sub-City"
              value={formData.fatherSubCity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="fatherKebele"
              placeholder="Kebele"
              value={formData.fatherKebele}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="fatherHouseNo"
              placeholder="House No."
              value={formData.fatherHouseNo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
        </div>

        {/* Mother Information */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Mothers Full Name (English):
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                First Name
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
                Middle Name
              </label>
              <input
                type="text"
                name="motherMiddleName"
                value={formData.motherMiddleName}
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
                name="motherLastName"
                value={formData.motherLastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Mothers Full Name (AMH):
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                First Name
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
                Middle Name
              </label>
              <input
                type="text"
                name="motherMiddleNameAMH"
                value={formData.motherMiddleNameAMH}
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
                name="motherLastNameAMH"
                value={formData.motherLastNameAMH}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* <label className="block text-xs text-gray-500 mb-1">Address:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="motherRegion"
              placeholder="Region"
              value={formData.motherRegion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="motherZone"
              placeholder="Zone"
              value={formData.motherZone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="motherWoreda"
              placeholder="Woreda/Town"
              value={formData.motherWoreda}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="motherKifleKetema"
              placeholder="Kifle Ketema"
              value={formData.motherKifleKetema}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="motherKebele"
              placeholder="Kebele"
              value={formData.motherKebele}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="motherHouseNo"
              placeholder="House No."
              value={formData.motherHouseNo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
        </div>
      </section>
    </div>
  );
};

const EducationalInformationStep = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [previews, setPreviews] = useState(
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
  );
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

        {/* Secondary Schools */}
        {/* <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secondary School(s) Attended (List last three Schools):
          </label>
          {formData.schools.map((school, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-200 rounded-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    School
                  </label>
                  <input
                    type="text"
                    value={school.name}
                    onChange={(e) =>
                      handleNestedChange(
                        "schools",
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Town
                  </label>
                  <input
                    type="text"
                    value={school.town}
                    onChange={(e) =>
                      handleNestedChange(
                        "schools",
                        index,
                        "town",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Attended Year (E.C)
                  </label>
                  <input
                    type="text"
                    value={school.year}
                    onChange={(e) =>
                      handleNestedChange(
                        "schools",
                        index,
                        "year",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Last Grade Complete:
                </label>
                <div className="flex gap-4">
                  {[9, 10, 11, 12].map((grade) => (
                    <label key={grade} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={school.grades[grade]}
                        onChange={(e) =>
                          handleGradeChange(index, grade, e.target.checked)
                        }
                        className="mr-1"
                      />
                      {grade}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <section className="border-2 border-blue-200 rounded-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
          <div className="border-t-2 border-blue-400 pt-4 flex flex-col items-center">
            {/* Certificate Icon/Image */}
            <img
              src="/assets/certificate.png" // replace with your image path
              alt="Certificate Icon"
              className="w-24 h-24 mb-4"
            />

            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Please Upload Your Certificate
            </h3>
            <p className="text-sm font-medium text-gray-600 mb-4 text-center">
              Upload your Grade 12 certificate below:
            </p>

            {/* Certificate uploader */}
            <div className="flex items-center gap-3">
              {/* Hidden input */}
              <input
                id="upload-certificate"
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormData((prev) => ({
                      ...prev,
                      grade12Certificate: file,
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
                {formData.grade12Certificate
                  ? formData.grade12Certificate.name
                  : "No file chosen"}
              </span>
            </div>

            {/* Preview (optional for images only) */}
            {formData.grade12Certificate &&
              formData.grade12Certificate instanceof File &&
              formData.grade12Certificate.type.startsWith("image/") && (
                <div className="mt-3 relative inline-block">
                  <img
                    src={URL.createObjectURL(formData.grade12Certificate)}
                    alt="Certificate Preview"
                    className="w-32 h-32 object-cover rounded-md border"
                  />
                  {/* Close/Remove button */}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        grade12Certificate: null,
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

        {/* <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Indicate Your Preparatory School Stream:
          </label>
          <div className="flex flex-wrap gap-4">
            {["Natural Science", "Social Science"].map((stream) => (
              <label key={stream} className="flex items-center">
                <input
                  type="radio"
                  name="prepStream"
                  value={stream}
                  checked={formData.prepStream === stream}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {stream}
              </label>
            ))}
            <div className="flex items-center">
              <input
                type="radio"
                name="prepStream"
                value="Other"
                checked={formData.prepStream === "Other"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="mr-2">Others Specify:</span>
              <input
                type="text"
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={formData.prepStream !== "Other"}
              />
            </div>
          </div>
        </div> */}

        {/* <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Indicate Your Choice of Study:
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              "Medicine",
              "MRT",
              "Nursing",
              "Accounting & Finance",
              "Management",
            ].map((choice) => (
              <label key={choice} className="flex items-center">
                <input
                  type="radio"
                  name="studyChoice"
                  value={choice}
                  checked={formData.studyChoice === choice}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {choice}
              </label>
            ))}
          </div>
        </div> */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
            Select Your Department
          </label>
          <div className="relative">
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Choose Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Business Administration">
                Business Administration
              </option>
              <option value="Psychology">Psychology</option>
              <option value="Biology">Biology</option>
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
            Select Program Modality
          </label>
          <div className="relative">
            <select
              name="programModality"
              value={formData.programModality}
              onChange={handleInputChange}
              className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="Regular">Regular</option>
              <option value="Extension/Weekend">Extension/Weekend</option>
              <option value="Summer">Summer</option>
              <option value="Distance">Distance</option>
              <option value="Winter In-service">Winter In-service</option>
              <option value="Daytime">Daytime</option>
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
            Select School Background
          </label>
          <div className="relative">
            <select
              name="schoolBackground"
              value={formData.schoolBackground}
              onChange={handleInputChange}
              className="appearance-none w-full bg-white dark:bg-black border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Choose Background</option>
              <option value="High School Graduate">High School Graduate</option>
              <option value="College Diploma">College Diploma</option>
              <option value="College Degree">College Degree</option>
              <option value="Level_IV">Level_IV</option>
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

        {/* EHEECE Information */}
        {/* <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ethiopian Higher Education Entrance Certificate Examination (EHEECE)
            information (write five/seven subjects with the best grade earned.
            Math's & English must be included):
          </label>
          <div className="space-y-3">
            {formData.subjects.map((subject, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) =>
                      handleNestedChange(
                        "subjects",
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    EHEECE Reg. No.
                  </label>
                  <input
                    type="text"
                    value={subject.regNo}
                    onChange={(e) =>
                      handleNestedChange(
                        "subjects",
                        index,
                        "regNo",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Year (E.C)
                  </label>
                  <input
                    type="text"
                    value={subject.year}
                    onChange={(e) =>
                      handleNestedChange(
                        "subjects",
                        index,
                        "year",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Grade (Mark)
                  </label>
                  <input
                    type="text"
                    value={subject.grade}
                    onChange={(e) =>
                      handleNestedChange(
                        "subjects",
                        index,
                        "grade",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Post Secondary Education */}
        {/* <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Have you ever been enrolled in any post-secondary education
            (University or College level) institution in Ethiopia or Abroad?
          </label>
          <div className="flex gap-4 mb-4">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="hasPostSecondary"
                  value={option}
                  checked={formData.hasPostSecondary === option}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          {formData.hasPostSecondary === "Yes" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                If your answer is yes, give the detail below:
              </label>
              <div className="space-y-4">
                {formData.institutions.map((institution, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-gray-200 rounded-md"
                  >
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Name of Institution
                      </label>
                      <input
                        type="text"
                        value={institution.name}
                        onChange={(e) =>
                          handleNestedChange(
                            "institutions",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={institution.country}
                        onChange={(e) =>
                          handleNestedChange(
                            "institutions",
                            index,
                            "country",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Years Attended
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="From"
                          value={institution.yearFrom}
                          onChange={(e) =>
                            handleNestedChange(
                              "institutions",
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
                          value={institution.yearTo}
                          onChange={(e) =>
                            handleNestedChange(
                              "institutions",
                              index,
                              "yearTo",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        GPA Earned
                      </label>
                      <input
                        type="text"
                        value={institution.gpa}
                        onChange={(e) =>
                          handleNestedChange(
                            "institutions",
                            index,
                            "gpa",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Awarded
                      </label>
                      <input
                        type="text"
                        value={institution.awarded}
                        onChange={(e) =>
                          handleNestedChange(
                            "institutions",
                            index,
                            "awarded",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div> */}
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

const ReviewSubmitStep = ({ formData, setFormData, onSubmit }) => {
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
        // applicantName,
        // applicantSignature,
        // submissionDate,
      };
      console.log(finalData);
      onSubmit(finalData);
    } catch (error) {}
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
          {/* <div>
            <span className="font-medium">Admission Type:</span>{" "}
            {formData.admissionType}
          </div> */}
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
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 dark:text-gray-100 mb-1">
                Date
              </label>
              <input
                type="date"
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                Applicant's Name
              </label>
              <input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-100 mb-1">
                Applicant's Signature
              </label>
              <input
                type="text"
                placeholder="Digital signature or type name"
                value={applicantSignature}
                onChange={(e) => setApplicantSignature(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div> */}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Submit Registration Form
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

          // Marital Status
          maritalStatus: "",

          // Emergency Contact
          emergencyfirstName: "",
          emergencymiddleName: "",
          emergencylastName: "",
          emergencyfirstNameAMH: "",
          emergencymiddleNameAMH: "",
          emergencylastNameAMH: "",

          // emergencyName: "",
          // emergencyRelation: "",
          // emergencyHomePhone: "",
          // emergencyOfficePhone: "",
          // emergencyMobile: "",
          // emergencyRegion: "",
          // emergencyZone: "",
          // emergencyWoreda: "",
          // emergencySubCity: "",
          // emergencyKebele: "",
          // emergencyHouseNo: "",

          // Family Background
          // fatherName: "",
          // fatherRegion: "",
          // fatherZone: "",
          // fatherWoreda: "",
          // fatherSubCity: "",
          // fatherKebele: "",
          // fatherHouseNo: "",
          // motherName: "",
          // motherRegion: "",
          // motherZone: "",
          // motherWoreda: "",
          // motherKifleKetema: "",
          // motherKebele: "",
          // motherHouseNo: "",

          // Educational Information
          // schools: [
          //   {
          //     name: "",
          //     town: "",
          //     year: "",
          //     grades: { 9: false, 10: false, 11: false, 12: false },
          //   },
          //   {
          //     name: "",
          //     town: "",
          //     year: "",
          //     grades: { 9: false, 10: false, 11: false, 12: false },
          //   },
          //   {
          //     name: "",
          //     town: "",
          //     year: "",
          //     grades: { 9: false, 10: false, 11: false, 12: false },
          //   },
          // ],
          // prepStream: "",
          // studyChoice: "",

          // EHEECE Information
          // subjects: [
          //   { name: "", regNo: "", year: "", grade: "" },
          //   { name: "", regNo: "", year: "", grade: "" },
          //   { name: "", regNo: "", year: "", grade: "" },
          //   { name: "", regNo: "", year: "", grade: "" },
          //   { name: "", regNo: "", year: "", grade: "" },
          //   { name: "", regNo: "", year: "", grade: "" },
          //   { name: "", regNo: "", year: "", grade: "" },
          // ],

          // Post Secondary Education
          // hasPostSecondary: "",
          // institutions: [
          //   {
          //     name: "",
          //     country: "",
          //     yearFrom: "",
          //     yearTo: "",
          //     gpa: "",
          //     awarded: "",
          //   },
          //   {
          //     name: "",
          //     country: "",
          //     yearFrom: "",
          //     yearTo: "",
          //     gpa: "",
          //     awarded: "",
          //   },
          // ],

          // // Employment
          // currentlyEmployed: "",
          // currentEmployer: "",
          // currentJobType: "",
          // currentEmployerAddress: "",
          // currentEmployerPhone: "",
          // employmentHistory: [
          //   {
          //     type: "",
          //     employer: "",
          //     poBox: "",
          //     telephone: "",
          //     yearFrom: "",
          //     yearTo: "",
          //   },
          //   {
          //     type: "",
          //     employer: "",
          //     poBox: "",
          //     telephone: "",
          //     yearFrom: "",
          //     yearTo: "",
          //   },
          //   {
          //     type: "",
          //     employer: "",
          //     poBox: "",
          //     telephone: "",
          //     yearFrom: "",
          //     yearTo: "",
          //   },
          // ],
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

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const jsonData = {
      firstNameAMH: "አበበ",
      firstNameENG: "Abebe",
      fatherNameAMH: "ከበደ",
      fatherNameENG: "Kebede",
      grandfatherNameAMH: "ወልደ",
      grandfatherNameENG: "Welde",
      motherNameAMH: "ማሪያም",
      motherNameENG: "Mariam",
      motherFatherNameAMH: "ገብረ",
      motherFatherNameENG: "Gebere",
      gender: "MALE",
      age: 20,
      phoneNumber: "+251912345678",
      dateOfBirthEC: "2015-01-01",
      dateOfBirthGC: "2023-01-01",
      placeOfBirthWoredaCode: "WRD001",
      placeOfBirthZoneCode: "ZON001",
      placeOfBirthRegionCode: "REG001",
      currentAddressWoredaCode: "WRD002",
      currentAddressZoneCode: "ZON002",
      currentAddressRegionCode: "REG002",
      email: "abebe@example.com",
      maritalStatus: "SINGLE",
      impairmentCode: "IMP001",
      schoolBackgroundId: 1,
      contactPersonFirstNameAMH: "ዳዊት",
      contactPersonFirstNameENG: "Dawit",
      contactPersonLastNameAMH: "ተስፋ",
      contactPersonLastNameENG: "Tesfa",
      contactPersonPhoneNumber: "+251987654321",
      contactPersonRelation: "Brother",
      departmentEnrolledId: 1,
      programModalityCode: "REGULAR",
      classYearId: 1,
      semesterCode: "S1",
    };

    try {
      // Append the JSON string as the 'data' part
      formData.append(
        "data",
        new Blob([JSON.stringify(jsonData)], { type: "application/json" })
      );

      const response = await apiService.post(endPoints.applicants, formData);

      console.log("Response:", response.data);
      console.log("Form submitted:", jsonData);

      // Clear localStorage on successful submission
      localStorage.removeItem("registrationFormData");
      localStorage.removeItem("registrationCurrentStep");
      alert("Registration form submitted successfully!");

      return response.data;
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting the form.");
      throw error;
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
          />
        );
      case 4:
        return (
          <ReviewSubmitStep
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
        );

      default:
        return (
          <PersonalInformationStep
            formData={formData}
            setFormData={setFormData}
          />
        );
    }
  };

  return (
    // <div className="w-full mx-auto p-6 bg-white dark:bg-black">
    <div className="relative min-h-screen  bg-gray-50 dark:bg-gray-900 px-6 md:px-16 lg:px-28 overflow-auto overflow-x-hidden">
      {/* <div className="hidden dark:block fixed inset-0">
        <DarkVeil className="w-full h-full object-cover" />
      </div> */}
      <div className="relative z-10">
        <header className="container mx-auto px-4 py-12 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <img src="/assets/companylogo.jpg" className="h-[50px] w-full" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                fanum
              </h1>
              <p className="text-sm text-gray-600  dark:text-gray-300">tax</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>
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
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

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
                &copy; 2024 Deutsche Hochschule für Medizin College. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MultiStepRegistrationForm;
