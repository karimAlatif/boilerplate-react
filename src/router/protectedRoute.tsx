import React, { Suspense, useEffect } from 'react';
import useUserData from '../core/hooks/useUserData';
import Loader from '../components/loader';

const ProtectedRoute = ({
	Element,
}: {
	Element: React.LazyExoticComponent<any>;
}) => {
	const { user, authenticate, getUserData, authenticated } =
		useUserData();

	useEffect(() => {
		if (authenticated()) {
			if (!user) {
				getUserData();
			}
			return;
		} else {
			authenticate();
		}
	}, [user, authenticate, authenticated, getUserData]);

	if (user) {
		return (
			<Suspense fallback={<Loader />}>
				<Element />
			</Suspense>
		);
	} else {
		return <></>;
	}
};

export default ProtectedRoute;
