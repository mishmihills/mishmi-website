import React, { useState, useEffect } from 'react';
import adminapi from '../../api/adminapi';

const Coupon = ({ setAppliedCoupon, payableamount, appliedCoupon, applicableCategory, reseter, setReseter }) => {
    const [couponCode, setCouponCode] = useState('');
    const [isApplied, setIsApplied] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const applyCoupon = async ({ purchaseAmount, categories }) => {
        if (!purchaseAmount || !categories) {
            setMessage('Invalid coupon code');
            return;
        }
        if (appliedCoupon) {
            setIsApplied(true);
            setMessage('Coupon is already applied');
            return;
        }
        setLoading(true);
        try {
            const response = await adminapi.post('/applycoupon', { code: couponCode, purchaseAmount, categories });
            if (response.data) {
                setIsApplied(true);
                setMessage('Coupon is applied successfully');
                setAppliedCoupon(response.data);
            } else {
                setMessage('Invalid coupon code');
            }
        } catch (error) {
            setMessage(error?.response?.data?.message ?? 'Error applying coupon');
        } finally {
            setLoading(false);
        }
    };

    const removeCoupon = () => {
        setIsApplied(false);
        setCouponCode('');
        setAppliedCoupon(null);
        setMessage('');
    };

    useEffect(() => {
        if (reseter) {
            setIsApplied(false);
            setCouponCode('');
            setAppliedCoupon(null);
            setMessage('');
            setLoading(false);
        }

       
    }, [reseter]);

    return (
        <div style={{ width: '100%' }} className="coupon-container">
            <div
                style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                className="sidebar__total__price mb-3"
            >
                {!isApplied ? (
                    <>
                        <div style={{ width: '60%' }} className="sidebar__form__single">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                                className="dff"
                            />
                            {message && !isApplied && <p style={{ color: 'red', fontSize: '0.8rem' }}>{message}</p>}
                        </div>
                        <button
                            type="button"
                            disabled={loading}
                            style={{
                                border: 'none',
                                width: '38%',
                                marginLeft: '5px',
                                padding: '5px 8px',
                                backgroundColor: 'lightgrey',
                                borderRadius: '5px',
                                maxHeight: '2.8rem',
                            }}
                            className="coupon__btn"
                            onClick={() => applyCoupon({ purchaseAmount: payableamount, categories: applicableCategory })}
                        >
                            {loading ? 'Loading...' : 'Apply'}
                        </button>
                    </>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <p style={{ color: 'green', fontSize: '0.8rem', margin: 0, flex: 1 }}>{message}</p>
                        <button
                            type="button"
                            onClick={() => removeCoupon()}
                            style={{
                                border: 'none',
                                marginLeft: '5px',
                                padding: '5px 8px',
                                backgroundColor: 'lightgrey',
                                borderRadius: '5px',
                                maxHeight: '2.8rem',
                            }}
                        >
                            Remove Coupon
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Coupon;
