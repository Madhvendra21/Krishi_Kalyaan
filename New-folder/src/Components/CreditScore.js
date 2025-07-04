import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import CreditScoreSlider from './CreditScoreSlider';

const { Option } = Select;

const CreditScore = () => {
    const [form] = Form.useForm();
    const [creditScore, setCreditScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pincodeFound, setPincodeFound] = useState(true);

    const dataTopredict = {
        seasons: [
            { season: 'summer', value: 20 },
            { season: 'winter', value: 7 },
            { season: 'autumn', value: 6 },
            { season: 'spring', value: 4 },
        ],
        pincodes: [
            { pincode: '11003', value: 30 },
            { pincode: '11001', value: 20 },
            { pincode: '11005', value: 15 },
            { pincode: '11004', value: 11 },
            { pincode: '11001', value: 17 },

        ],
        crops: [
            { crop: 'wheat', value: 10 },
            { crop: 'rice', value: 18 },
            { crop: 'soyabean', value: 10 },
            { crop: 'kali-dal', value: 12 },
            { crop: 'harhar-dal', value: 11 },
        ],
        irrigation: [
            { irrigation: 'yes', value: 5 },
            { irrigation: 'no', value: 10 },
        ],
        landOwnership: [
            { ownership: 'own', value: 10 },
            { ownership: 'lease', value: 0 },
        ],
    };
    const findValue = (arr, key, val) => {
        const item = arr.find(item => item[key] === val);
        if (key === 'pincode') {
            if (!item) {
                setPincodeFound(false);
                return 0;
            } else {
                setPincodeFound(true);
            }
        }
        return item ? item.value : 0;
    };

    const parseNumber = (value) => {
        const parsed = parseInt(value, 10);
        return isNaN(parsed) ? 0 : parsed;
    };
    const calculateCreditScore = (values) => {
        let score = 0;
        // setPincodeFound(true);
        score += findValue(dataTopredict.seasons, 'season', values.season);
        score += findValue(dataTopredict.pincodes, 'pincode', values.Pincode);
        score += findValue(dataTopredict.crops, 'crop', values['crop-name']);
        score += findValue(dataTopredict.irrigation, 'irrigation', values['irrigation-facility']);
        score += findValue(dataTopredict.landOwnership, 'ownership', values['land-ownership']);

        // Adjust scores for numeric values
        score += parseNumber(values['area-of-land']);
        score += parseNumber(values['current-sales']);
        score += parseNumber(values['previous-sales']);
        score += parseNumber(values['job-income']);
        console.log(score, "score");

        return score;
    };



    const onFinish = async (values) => {
        setLoading(true);
        message.loading({ content: 'Calculating Credit Score...', duration: 2 });

        try {
            const score = await calculateCreditScore(values);
            setCreditScore(score);
            setLoading(false);
            if (pincodeFound) {
                message.success({ content: 'Credit Score Calculated!', duration: 2 });
            } else {
                message.warning({ content: `Pincode ${values.Pincode} is not present in the database.`, duration: 2 });
            }
        } catch (error) {
            message.error(`Failed to calculate credit score: ${error.message}`);
            setLoading(false);
        }
    };

    useEffect(() => {
    });


    return (
        <div className="container" style={{ padding: 20, width: '80%' }}>
            <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Krishikalyaan</h1>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item name="season" label="Season:" rules={[{ required: true }]}>
                    <Select placeholder="Select a season">
                        <Option value="summer">Summer</Option>
                        <Option value="winter">Winter</Option>
                        <Option value="autumn">Autumn</Option>
                        <Option value="spring">Spring</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="crop-name" label="Crop Name:" rules={[{ required: true }]}>
                    <Select placeholder="Select a crop">
                        <Option value="wheat">Wheat</Option>
                        <Option value="rice">Rice</Option>
                        <Option value="soyabean">Soyabean</Option>
                        <Option value="kali-dal">Kali Dal</Option>
                        <Option value="harhar-dal">Harhar Dal</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="Pincode" label="Pincode:">
                    <Input placeholder="Enter Pincode " />
                </Form.Item>

                <Form.Item name="irrigation-facility" label="Irrigation Facility:" rules={[{ required: true }]}>
                    <Select placeholder="Select an option">
                        <Option value="yes">Yes</Option>
                        <Option value="no">No</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="land-ownership" label="Whether the Land is on Lease or Own:" rules={[{ required: true }]}>
                    <Select placeholder="Select an option">
                        <Option value="own">Owned</Option>
                        <Option value="lease">Lease</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="area-of-land" label="Area of Land:" rules={[{ required: true }]}>
                    <Input placeholder="Enter area size in meters." />
                </Form.Item>

                <Form.Item label="Sales of the Crop - Current Year" name="current-sales">
                    <Input placeholder="Previous Season in That Year" />
                </Form.Item>

                <Form.Item label="Sales of the Crop - Previous Year" name="previous-sales">
                    <Input placeholder="Previous Year Season" />
                </Form.Item>

                <Form.Item label="Any Other Income Source" name="income-source">
                    <Input placeholder="Job Name" />
                </Form.Item>

                <Form.Item label="Income from the Job" name="job-income">
                    <Input />
                </Form.Item>

                <Form.Item label="Movable Assets" name="movable-assets">
                    <Input />
                </Form.Item>

                <Form.Item label="Immovable Assets" name="immovable-assets">
                    <Input />
                </Form.Item>

                <Form.Item label="Crop Pattern Followed in That Area" name="crop-pattern">
                    <Input placeholder="The value by weather and soil data automatic" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Predict Loan Payment Ability
                    </Button>
                </Form.Item>
            </Form>


            {creditScore > 0 && pincodeFound && (
                <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <h2>Predicted Credit Score: {creditScore}</h2>
                </div>
            )}
            {!pincodeFound && (
                <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <h2>Data is not present in database, we are launching soon</h2>
                </div>
            )}

            <CreditScoreSlider creditScore={creditScore} />
        </div>
    );
}

export default CreditScore;
