import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type InventoryCardProps = {
	name: string;
	price: number;
	cost: number;
	stock: number;
	icon?: any;
	onAction?: () => void;
};

const InventoryCard: React.FC<InventoryCardProps> = ({
	name,
	price,
	cost,
	stock,
	icon,
	onAction,
}) => {
	return (
		<View style={styles.card}>
			<View style={styles.row}>
				<View style={styles.iconWrap}>
					{icon ? (
						<Image source={icon} style={styles.iconImg} />
					) : (
						<View style={styles.iconSvgWrap}>
							<Text style={styles.iconSvg}>📦</Text>
						</View>
					)}
				</View>
				<View style={styles.infoCol}>
					<Text style={styles.name} numberOfLines={1}>{name}</Text>
					<View style={styles.priceRow}>
						<Text style={styles.price}>₱{price.toFixed(2)}</Text>
						<Text style={styles.divider}>|</Text>
						<Text style={styles.cost}>Cost: ₱{cost.toFixed(2)}</Text>
						<View style={styles.profitBadge}><Text style={styles.profitText}>{((price-cost)/cost*100).toFixed(0)}%</Text></View>
					</View>
				</View>
				<View style={styles.stockWrap}>
					<Text style={styles.stockLabel}>Stock</Text>
					<Text style={styles.stockValue}>{stock}</Text>
					<TouchableOpacity style={styles.actionBtn} onPress={onAction}>
						<Text style={styles.actionIcon}>✏️</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fcfcfcff',
		padding: 16,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#F7E9D7',
		marginVertical: 8,
		marginHorizontal: 4,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
	},
	iconWrap: {
		width: 48,
		height: 48,
		backgroundColor: '#F3F4F6',
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		marginRight: 12,
	},
	iconImg: {
		width: 32,
		height: 32,
		resizeMode: 'contain',
	},
	iconSvgWrap: {
		width: 32,
		height: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconSvg: {
		fontSize: 24,
		color: '#9CA3AF',
	},
		infoCol: {
			flex: 1,
			justifyContent: 'center',
			minWidth: 0,
			paddingRight: 12,
		},
	name: {
		fontWeight: '600',
		fontSize: 18,
		color: '#4C2E24',
		marginBottom: 2,
	},
	priceRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	price: {
		fontWeight: '600',
		fontSize: 12,
		color: '#DA834D',
	},
	divider: {
		fontSize: 12,
		color: '#9CA3AF',
		marginHorizontal: 4,
	},
	cost: {
		fontSize: 12,
		color: '#4C2E24',
		opacity: 0.7,
	},
	profitBadge: {
		backgroundColor: '#ECFDF5',
		borderRadius: 4,
		paddingHorizontal: 6,
		paddingVertical: 2,
		marginLeft: 4,
	},
	profitText: {
		fontSize: 12,
		color: '#059669',
		fontWeight: 'bold',
	},
		// Removed descRow, desc, badgeWrap, badgeDot, badgeText for cleaner display
	stockWrap: {
		alignItems: 'center',
		gap: 2,
		marginLeft: 16,
	},
	stockLabel: {
		fontSize: 13,
		color: '#4C2E24',
		opacity: 0.7,
		marginBottom: 2,
		textAlign: 'center',
	},
	stockValue: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#4C2E24',
		textAlign: 'center',
	},
	actionBtn: {
		backgroundColor: '#FDEAD7',
		borderRadius: 4,
		padding: 8,
		marginTop: 4,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.08,
		shadowRadius: 2,
	},
	actionIcon: {
		fontSize: 18,
		color: '#4C2E24',
	},
});

export default InventoryCard;
