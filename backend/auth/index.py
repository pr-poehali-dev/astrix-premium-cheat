"""
Business: Authentication API for user registration, login, and profile retrieval
Args: event with httpMethod, body, queryStringParameters
Returns: HTTP response with user data or error
"""

import json
import os
import hashlib
import psycopg2
from typing import Dict, Any

def get_db_connection():
    """Create database connection using DATABASE_URL environment variable"""
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def hash_password(password: str) -> str:
    """Hash password using SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            
            if action == 'register':
                username = body_data.get('username', '').strip()
                email = body_data.get('email', '').strip()
                password = body_data.get('password', '')
                
                if not username or not email or not password:
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({'error': 'Все поля обязательны'}),
                        'isBase64Encoded': False
                    }
                
                password_hash = hash_password(password)
                
                cursor.execute(
                    "SELECT id FROM users WHERE email = '" + email + "' OR username = '" + username + "'"
                )
                existing_user = cursor.fetchone()
                
                if existing_user:
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({'error': 'Пользователь с таким email или username уже существует'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute(
                    "INSERT INTO users (username, email, password_hash) VALUES ('" + 
                    username + "', '" + email + "', '" + password_hash + "') RETURNING id"
                )
                user_id = cursor.fetchone()[0]
                conn.commit()
                
                cursor.execute("SELECT username, email, id FROM users WHERE id = " + str(user_id))
                user = cursor.fetchone()
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'user': {
                            'id': user[2],
                            'username': user[0],
                            'email': user[1]
                        }
                    }),
                    'isBase64Encoded': False
                }
            
            elif action == 'login':
                email = body_data.get('email', '').strip()
                password = body_data.get('password', '')
                
                if not email or not password:
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({'error': 'Email и пароль обязательны'}),
                        'isBase64Encoded': False
                    }
                
                password_hash = hash_password(password)
                
                cursor.execute(
                    "SELECT id, username, email FROM users WHERE email = '" + 
                    email + "' AND password_hash = '" + password_hash + "'"
                )
                user = cursor.fetchone()
                
                if not user:
                    return {
                        'statusCode': 401,
                        'headers': headers,
                        'body': json.dumps({'error': 'Неверный email или пароль'}),
                        'isBase64Encoded': False
                    }
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'user': {
                            'id': user[0],
                            'username': user[1],
                            'email': user[2]
                        }
                    }),
                    'isBase64Encoded': False
                }
        
        elif method == 'GET':
            user_id = event.get('queryStringParameters', {}).get('userId')
            
            if not user_id:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'userId обязателен'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "SELECT id, username, email, created_at FROM users WHERE id = " + str(user_id)
            )
            user = cursor.fetchone()
            
            if not user:
                return {
                    'statusCode': 404,
                    'headers': headers,
                    'body': json.dumps({'error': 'Пользователь не найден'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "SELECT plan_name, price, status, purchased_at FROM purchases WHERE user_id = " + 
                str(user_id) + " ORDER BY purchased_at DESC"
            )
            purchases_raw = cursor.fetchall()
            purchases = [
                {
                    'plan': p[0],
                    'price': p[1],
                    'status': p[2],
                    'date': p[3].strftime('%Y-%m-%d') if p[3] else ''
                }
                for p in purchases_raw
            ]
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'user': {
                        'id': user[0],
                        'username': user[1],
                        'email': user[2],
                        'createdAt': user[3].isoformat() if user[3] else ''
                    },
                    'purchases': purchases
                }),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()
