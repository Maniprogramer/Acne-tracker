import React, { useState, useEffect } from 'react';

// Helper function to convert array to comma-separated string for display/export
const arrayToCommaString = (arr) => arr.join(', ');

// Helper function to convert object with string values to CSV row
const convertToCsv = (data) => {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvRows = [];

    // Add header row
    csvRows.push(headers.map(header => `"${header.replace(/"/g, '""')}"`).join(','));

    // Add data rows
    for (const row of data) {
        const values = headers.map(header => {
            let value = row[header];
            if (Array.isArray(value)) {
                value = arrayToCommaString(value);
            }
            // Ensure value is treated as string and escape double quotes
            return `"${String(value).replace(/"/g, '""')}"`;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
};

// Initial state for the form fields
const initialFormData = {
    date: '',
    dayOfWeek: '',
    timeOfEntry: '',
    newBreakoutsToday: '',
    locationNewBreakouts: '', // Comma-separated string
    typeNewBreakouts: '', // Comma-separated string
    currentAcneSeverity: '',
    inflammationLevel: '',
    painLevel: '',
    numWhiteheads: '',
    numBlackheads: '',
    numPapules: '',
    numPustules: '',
    numCystsNodules: '',
    acneScarring: '',
    meal1Time: '',
    meal1Foods: '',
    meal2Time: '',
    meal2Foods: '',
    meal3Time: '',
    meal3Foods: '',
    snacks: '',
    beverages: '',
    dairyIntake: '',
    sugarIntake: '',
    processedFoodIntake: '',
    hydration: '',
    suspectedFoodTriggers: '',
    skincareAmCleanser: '',
    skincareAmTreatments: '',
    skincareAmMoisturizer: '',
    skincareAmSpf: '',
    skincarePmCleanser: '',
    skincarePmTreatments: '',
    skincarePmMoisturizer: '',
    newSkincareProduct: '',
    newSkincareProductNameDate: '',
    makeupWorn: '',
    makeupHours: '',
    makeupBrandType: '',
    sleepQuality: '',
    hoursOfSleep: '',
    stressLevel: '',
    sourceOfStress: '',
    exerciseToday: '',
    exerciseTypeDuration: '',
    showerAfterExercise: '',
    sweatingLevel: '',
    environmentalHumidity: '',
    environmentalTemperature: '',
    sunExposure: '',
    sunDurationSpf: '',
    touchingFaceFreq: '',
    hairCleanliness: '',
    pillowcaseChanged: '',
    towelsChanged: '',
    wearingHatsHeadbands: '',
    phoneScreenCleaned: '',
    dayOfMenstrualCycle: '',
    pmsSymptoms: '', // Comma-separated string
    newMedications: '',
    newMedicationsNameDosage: '',
    existingMedicalConditions: '',
    existingMedicalConditionsSpecify: '',
    supplementsTaken: '',
    overallMood: '',
    feelingOfWellbeing: '',
    dailyNotes: ''
};

function App() {
    const [formData, setFormData] = useState(initialFormData);
    const [entries, setEntries] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Set current date and time as defaults on load
    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
        const dd = String(today.getDate()).padStart(2, '0');
        const hh = String(today.getHours()).padStart(2, '0');
        const min = String(today.getMinutes()).padStart(2, '0');

        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = dayNames[today.getDay()];

        setFormData(prev => ({
            ...prev,
            date: `${yyyy}-${mm}-${dd}`,
            dayOfWeek: dayOfWeek,
            timeOfEntry: `${hh}:${min}`
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            // For checkboxes, handle multiple selections if needed, or just boolean
            // For now, assuming single boolean or text input for multi-select fields
            setFormData({ ...formData, [name]: checked ? 'Yes' : 'No' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEntries([...entries, formData]);
        setFormData(initialFormData); // Reset form for new entry

        // Set current date and time for the *next* entry
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const hh = String(today.getHours()).padStart(2, '0');
        const min = String(today.getMinutes()).padStart(2, '0');
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = dayNames[today.getDay()];

        setFormData(prev => ({
            ...prev,
            date: `${yyyy}-${mm}-${dd}`,
            dayOfWeek: dayOfWeek,
            timeOfEntry: `${hh}:${min}`
        }));

        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
    };

    const handleClearForm = () => {
        setFormData(initialFormData);
        // Reset current date and time for the cleared form
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const hh = String(today.getHours()).padStart(2, '0');
        const min = String(today.getMinutes()).padStart(2, '0');
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = dayNames[today.getDay()];

        setFormData(prev => ({
            ...prev,
            date: `${yyyy}-${mm}-${dd}`,
            dayOfWeek: dayOfWeek,
            timeOfEntry: `${hh}:${min}`
        }));
    };

    const exportData = () => {
        const csvString = convertToCsv(entries);
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) { // feature detection
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'acne_tracking_data.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Helper for input fields
    const InputField = ({ label, name, type = 'text', value, onChange, placeholder = '', options = [], min, max, step }) => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            {type === 'select' ? (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                >
                    <option value="">Select...</option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows="3"
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y"
                ></textarea>
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    step={step}
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            )}
        </div>
    );

    // Options for dropdowns
    const severityOptions = Array.from({ length: 6 }, (_, i) => ({ value: i, label: i.toString() }));
    const qualityOptions = Array.from({ length: 5 }, (_, i) => ({ value: i + 1, label: (i + 1).toString() }));
    const levelOptions = [
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' },
        { value: 'N/A', label: 'N/A' }
    ];
    const tempOptions = [
        { value: 'Hot', label: 'Hot' },
        { value: 'Warm', label: 'Warm' },
        { value: 'Mild', label: 'Mild' },
        { value: 'Cool', label: 'Cool' }
    ];
    const yesNoOptions = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 font-sans flex flex-col items-center">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                `}
            </style>
            <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 w-full max-w-4xl mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
                    Daily Acne & Lifestyle Tracker
                </h1>

                {showSuccessMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline ml-2">Entry added. Fill out for a new day.</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {/* Section: Date & General Information */}
                    <div className="md:col-span-2 border-b pb-4 mb-4">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">General Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <InputField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} />
                            <InputField label="Day of Week" name="dayOfWeek" type="text" value={formData.dayOfWeek} onChange={handleChange} readOnly />
                            <InputField label="Time of Entry" name="timeOfEntry" type="time" value={formData.timeOfEntry} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Section: Acne Status */}
                    <div className="md:col-span-2 border-b pb-4 mb-4">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Acne Status</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="New Breakouts Today?" name="newBreakoutsToday" type="select" value={formData.newBreakoutsToday} onChange={handleChange} options={yesNoOptions} />
                            <InputField label="Location of New Breakouts (comma-separated)" name="locationNewBreakouts" type="text" value={formData.locationNewBreakouts} onChange={handleChange} placeholder="e.g., Forehead, Chin, Left Cheek" />
                            <InputField label="Type of New Breakouts (comma-separated)" name="typeNewBreakouts" type="text" value={formData.typeNewBreakouts} onChange={handleChange} placeholder="e.g., Papules, Whiteheads, Cysts" />
                            <InputField label="Current Acne Severity (0-5)" name="currentAcneSeverity" type="select" value={formData.currentAcneSeverity} onChange={handleChange} options={severityOptions} />
                            <InputField label="Inflammation Level (0-5)" name="inflammationLevel" type="select" value={formData.inflammationLevel} onChange={handleChange} options={severityOptions} />
                            <InputField label="Pain Level (0-5)" name="painLevel" type="select" value={formData.painLevel} onChange={handleChange} options={severityOptions} />
                            <InputField label="Number of Whiteheads" name="numWhiteheads" type="number" value={formData.numWhiteheads} onChange={handleChange} min="0" />
                            <InputField label="Number of Blackheads" name="numBlackheads" type="number" value={formData.numBlackheads} onChange={handleChange} min="0" />
                            <InputField label="Number of Papules" name="numPapules" type="number" value={formData.numPapules} onChange={handleChange} min="0" />
                            <InputField label="Number of Pustules" name="numPustules" type="number" value={formData.numPustules} onChange={handleChange} min="0" />
                            <InputField label="Number of Cysts/Nodules" name="numCystsNodules" type="number" value={formData.numCystsNodules} onChange={handleChange} min="0" />
                            <InputField label="Acne Scarring/Hyperpigmentation (0-5)" name="acneScarring" type="select" value={formData.acneScarring} onChange={handleChange} options={severityOptions} />
                        </div>
                    </div>

                    {/* Section: Diet & Hydration */}
                    <div className="md:col-span-2 border-b pb-4 mb-4">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Diet & Hydration</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Meal 1 - Time" name="meal1Time" type="time" value={formData.meal1Time} onChange={handleChange} />
                            <InputField label="Meal 1 - Foods Consumed (Detailed)" name="meal1Foods" type="textarea" value={formData.meal1Foods} onChange={handleChange} placeholder="e.g., 2 scrambled eggs, 1 whole wheat toast, coffee w/ milk" />
                            <InputField label="Meal 2 - Time" name="meal2Time" type="time" value={formData.meal2Time} onChange={handleChange} />
                            <InputField label="Meal 2 - Foods Consumed (Detailed)" name="meal2Foods" type="textarea" value={formData.meal2Foods} onChange={handleChange} />
                            <InputField label="Meal 3 - Time" name="meal3Time" type="time" value={formData.meal3Time} onChange={handleChange} />
                            <InputField label="Meal 3 - Foods Consumed (Detailed)" name="meal3Foods" type="textarea" value={formData.meal3Foods} onChange={handleChange} />
                            <InputField label="Snacks - Time(s) & Foods Consumed (Detailed)" name="snacks" type="textarea" value={formData.snacks} onChange={handleChange} placeholder="e.g., 11:00 AM - Small banana; 05:00 PM - Handful of almonds" />
                            <InputField label="Beverages Consumed (Detailed)" name="beverages" type="textarea" value={formData.beverages} onChange={handleChange} placeholder="e.g., Water (2L), Coffee (2 cups w/ milk)" />
                            <InputField label="Dairy Intake (Yes/No/Amount)" name="dairyIntake" type="text" value={formData.dairyIntake} onChange={handleChange} placeholder="e.g., Yes/Milk (200ml) or No" />
                            <InputField label="Sugar Intake" name="sugarIntake" type="select" value={formData.sugarIntake} onChange={handleChange} options={levelOptions} />
                            <InputField label="Processed Food Intake" name="processedFoodIntake" type="select" value={formData.processedFoodIntake} onChange={handleChange} options={levelOptions} />
                            <InputField label="Hydration (Litres of Water)" name="hydration" type="number" value={formData.hydration} onChange={handleChange} step="0.1" min="0" />
                            <InputField label="Specific Food Triggers Suspected Today?" name="suspectedFoodTriggers" type="text" value={formData.suspectedFoodTriggers} onChange={handleChange} placeholder="e.g., Pizza, Chocolate" />
                        </div>
                    </div>

                    {/* Section: Skincare Routine */}
                    <div className="md:col-span-2 border-b pb-4 mb-4">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Skincare Routine</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Morning Cleanser Used" name="skincareAmCleanser" type="text" value={formData.skincareAmCleanser} onChange={handleChange} />
                            <InputField label="Morning Treatment Product(s) Used" name="skincareAmTreatments" type="text" value={formData.skincareAmTreatments} onChange={handleChange} placeholder="e.g., Benzoyl Peroxide 2.5%" />
                            <InputField label="Morning Moisturizer Used" name="skincareAmMoisturizer" type="text" value={formData.skincareAmMoisturizer} onChange={handleChange} />
                            <InputField label="Morning SPF Used" name="skincareAmSpf" type="text" value={formData.skincareAmSpf} onChange={handleChange} placeholder="e.g., SPF 30" />
                            <InputField label="Evening Cleanser Used" name="skincarePmCleanser" type="text" value={formData.skincarePmCleanser} onChange={handleChange} />
                            <InputField label="Evening Treatment Product(s) Used" name="skincarePmTreatments" type="text" value={formData.skincarePmTreatments} onChange={handleChange} />
                            <InputField label="Evening Moisturizer Used" name="skincarePmMoisturizer" type="text" value={formData.skincarePmMoisturizer} onChange={handleChange} />
                            <InputField label="Any New Skincare Products Introduced?" name="newSkincareProduct" type="select" value={formData.newSkincareProduct} onChange={handleChange} options={yesNoOptions} />
                            {formData.newSkincareProduct === 'Yes' && (
                                <InputField label="If Yes, Name & Date Introduced" name="newSkincareProductNameDate" type="text" value={formData.newSkincareProductNameDate} onChange={handleChange} placeholder="e.g., Vitamin C Serum (2025-07-01)" />
                            )}
                            <InputField label="Makeup Worn Today?" name="makeupWorn" type="select" value={formData.makeupWorn} onChange={handleChange} options={yesNoOptions} />
                            {formData.makeupWorn === 'Yes' && (
                                <>
                                    <InputField label="Approx. Hours Makeup Worn" name="makeupHours" type="number" value={formData.makeupHours} onChange={handleChange} min="0" />
                                    <InputField label="Makeup Brand/Type" name="makeupBrandType" type="text" value={formData.makeupBrandType} onChange={handleChange} placeholder="e.g., Foundation - Brand X" />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Section: Lifestyle & Environmental Factors */}
                    <div className="md:col-span-2 border-b pb-4 mb-4">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lifestyle & Environmental Factors</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Sleep Quality (1-5)" name="sleepQuality" type="select" value={formData.sleepQuality} onChange={handleChange} options={qualityOptions} />
                            <InputField label="Hours of Sleep" name="hoursOfSleep" type="number" value={formData.hoursOfSleep} onChange={handleChange} step="0.1" min="0" />
                            <InputField label="Stress Level (1-5)" name="stressLevel" type="select" value={formData.stressLevel} onChange={handleChange} options={qualityOptions} />
                            <InputField label="Source of Stress (if applicable)" name="sourceOfStress" type="text" value={formData.sourceOfStress} onChange={handleChange} placeholder="e.g., Work deadline, Personal" />
                            <InputField label="Exercise Today?" name="exerciseToday" type="select" value={formData.exerciseToday} onChange={handleChange} options={yesNoOptions} />
                            {formData.exerciseToday === 'Yes' && (
                                <>
                                    <InputField label="Exercise Type & Duration" name="exerciseTypeDuration" type="text" value={formData.exerciseTypeDuration} onChange={handleChange} placeholder="e.g., Running, 45 mins" />
                                    <InputField label="Shower/Cleanse After Exercise?" name="showerAfterExercise" type="select" value={formData.showerAfterExercise} onChange={handleChange} options={yesNoOptions} />
                                </>
                            )}
                            <InputField label="Sweating Level" name="sweatingLevel" type="select" value={formData.sweatingLevel} onChange={handleChange} options={levelOptions} />
                            <InputField label="Environmental Humidity" name="environmentalHumidity" type="select" value={formData.environmentalHumidity} onChange={handleChange} options={levelOptions} />
                            <InputField label="Environmental Temperature" name="environmentalTemperature" type="select" value={formData.environmentalTemperature} onChange={handleChange} options={tempOptions} />
                            <InputField label="Sun Exposure Today?" name="sunExposure" type="select" value={formData.sunExposure} onChange={handleChange} options={yesNoOptions} />
                            {formData.sunExposure === 'Yes' && (
                                <InputField label="If Yes, Duration & SPF used" name="sunDurationSpf" type="text" value={formData.sunDurationSpf} onChange={handleChange} placeholder="e.g., 30 mins / SPF 30" />
                            )}
                            <InputField label="Touching Face Frequency" name="touchingFaceFreq" type="select" value={formData.touchingFaceFreq} onChange={handleChange} options={levelOptions} />
                            <InputField label="Hair Cleanliness" name="hairCleanliness" type="select" value={formData.hairCleanliness} onChange={handleChange} options={[
                                { value: 'Clean', label: 'Clean' },
                                { value: 'Medium', label: 'Medium' },
                                { value: 'Greasy', label: 'Greasy' }
                            ]} />
                            <InputField label="Pillowcase Changed?" name="pillowcaseChanged" type="select" value={formData.pillowcaseChanged} onChange={handleChange} options={yesNoOptions} />
                            <InputField label="Towels Changed?" name="towelsChanged" type="select" value={formData.towelsChanged} onChange={handleChange} options={yesNoOptions} />
                            <InputField label="Wearing Hats/Headbands?" name="wearingHatsHeadbands" type="select" value={formData.wearingHatsHeadbands} onChange={handleChange} options={yesNoOptions} />
                            <InputField label="Phone Screen Cleaned?" name="phoneScreenCleaned" type="select" value={formData.phoneScreenCleaned} onChange={handleChange} options={yesNoOptions} />
                        </div>
                    </div>

                    {/* Section: Hormonal & Medical */}
                    <div className="md:col-span-2 border-b pb-4 mb-4">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Hormonal & Medical (If Applicable)</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Day of Menstrual Cycle (e.g., Day 1, Day 14)" name="dayOfMenstrualCycle" type="text" value={formData.dayOfMenstrualCycle} onChange={handleChange} placeholder="e.g., 1, 14, N/A" />
                            <InputField label="PMS Symptoms? (comma-separated)" name="pmsSymptoms" type="text" value={formData.pmsSymptoms} onChange={handleChange} placeholder="e.g., Bloating, Cravings, N/A" />
                            <InputField label="Any New Medications Started?" name="newMedications" type="select" value={formData.newMedications} onChange={handleChange} options={yesNoOptions} />
                            {formData.newMedications === 'Yes' && (
                                <InputField label="If Yes, Name & Dosage" name="newMedicationsNameDosage" type="text" value={formData.newMedicationsNameDosage} onChange={handleChange} placeholder="e.g., Antibiotic X, 200mg" />
                            )}
                            <InputField label="Any Existing Medical Conditions/Illnesses Today?" name="existingMedicalConditions" type="select" value={formData.existingMedicalConditions} onChange={handleChange} options={yesNoOptions} />
                            {formData.existingMedicalConditions === 'Yes' && (
                                <InputField label="If Yes, specify" name="existingMedicalConditionsSpecify" type="text" value={formData.existingMedicalConditionsSpecify} onChange={handleChange} placeholder="e.g., Cold, Fever" />
                            )}
                            <InputField label="Supplements Taken Today (Detailed)" name="supplementsTaken" type="textarea" value={formData.supplementsTaken} onChange={handleChange} placeholder="e.g., Vitamin D, Probiotic, Omega-3" />
                        </div>
                    </div>

                    {/* Section: Emotional & General Well-being */}
                    <div className="md:col-span-2 border-b pb-4 mb-4">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Emotional & General Well-being</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Overall Mood (1-5)" name="overallMood" type="select" value={formData.overallMood} onChange={handleChange} options={qualityOptions} />
                            <InputField label="Feeling of Well-being (1-5)" name="feelingOfWellbeing" type="select" value={formData.feelingOfWellbeing} onChange={handleChange} options={qualityOptions} />
                        </div>
                    </div>

                    {/* Section: Open Notes */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Open Notes</h2>
                        <InputField label="Daily Notes/Observations" name="dailyNotes" type="textarea" value={formData.dailyNotes} onChange={handleChange} placeholder="Add any additional observations or unusual events here." />
                    </div>

                    <div className="md:col-span-2 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Add Entry
                        </button>
                        <button
                            type="button"
                            onClick={handleClearForm}
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Clear Form
                        </button>
                    </div>
                </form>
            </div>

            {entries.length > 0 && (
                <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 w-full max-w-4xl">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recorded Entries</h2>
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {Object.keys(entries[0]).map((key) => (
                                        <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} {/* Converts camelCase to Title Case */}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {entries.map((entry, index) => (
                                    <tr key={index}>
                                        {Object.values(entry).map((value, i) => (
                                            <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {Array.isArray(value) ? arrayToCommaString(value) : value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={exportData}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Export Data to CSV
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
