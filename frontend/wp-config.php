<?php
/** Enable W3 Total Cache */
define('WP_CACHE', true); // Added by W3 Total Cache


/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'afrgymco_wp66994' );

/** Database username */
define( 'DB_USER', 'afrgymco_wp66994' );

/** Database password */
define( 'DB_PASSWORD', 'p39Ru(TS@7' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'iljy8cumqgjkscihnablkdt3qebx0qtrsj3e2z1inb3a7kpya8iuynhxxflvhnmc' );
define( 'SECURE_AUTH_KEY',  'gr5qujbztevipfa1ygkyxpn0kjlic1indscfnz4fpixyqlq9p1pumdci0mi18hxj' );
define( 'LOGGED_IN_KEY',    'jlvsr7weri2kcletwnbz96t5trpsbd9uz7rbjl3n1xx5ozubi1lkxsetolhnxcsm' );
define( 'NONCE_KEY',        'rkavcaudvbhff7etciakenmuoqu2who9j4tzufqgfjhskjlfsix8aldlagxktlsq' );
define( 'AUTH_SALT',        'nkxrqbkgvfchhvwvlm6aneeiz93mytipzoq0wkveofeuc6gkkox2p9oqog0jgukc' );
define( 'SECURE_AUTH_SALT', 'hb6fsevcnetmfypp8l7o0l9nsvyaaxgwp84qvyivajrm9jtglvsx0chu2gvvqno7' );
define( 'LOGGED_IN_SALT',   'aychxfr9gieqtkn5sxu24bfiddbiehymwucvgsvj3creufnnwntwnyz1o1kjtgtt' );
define( 'NONCE_SALT',       'ejk3ygt7t4gmd200omy4txshgb9oztedjql9fhhfidr0dhy7zqkc1jdhf8lvjuce' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpjh_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define('WP_DEBUG', true); 
define('WP_DEBUG_LOG', true);
//set to false later on
define('WP_DEBUG_DISPLAY', true);

define( 'WP_AUTO_UPDATE_CORE', 'minor' );


/* Add any custom values between this line and the "stop editing" line. */



define( 'SURECART_ENCRYPTION_KEY', 'jlvsr7weri2kcletwnbz96t5trpsbd9uz7rbjl3n1xx5ozubi1lkxsetolhnxcsm' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
