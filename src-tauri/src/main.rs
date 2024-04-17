// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs::{self}, time::{Duration, SystemTime}};
use serde::Serialize;

#[derive(Serialize)]
struct MetadataInfo {
    file_type: String,
    file_size: u64,
    created_time: String,
    modified_time: String,
    accessed_time: String,
}


#[tauri::command]
fn get_file_metadata(file_path: String) -> Result<MetadataInfo, String> {
    match fs::metadata(&file_path) {
        Ok(metadata) => {
            let file_type = metadata.file_type();
            let file_size = metadata.len();
            let created_time = metadata.created().unwrap_or(
                SystemTime::UNIX_EPOCH
            );
            let modified_time = metadata.modified().unwrap_or(
                SystemTime::UNIX_EPOCH
            );
            let accessed_time = metadata.accessed().unwrap_or(
                SystemTime::UNIX_EPOCH
            );

            

        
            Ok(MetadataInfo {
                file_type: if file_type.is_dir() {
                    "directory".to_string()
                } else {
                    "file".to_string()
                },
                file_size,
                created_time: created_time.duration_since(SystemTime::UNIX_EPOCH).unwrap_or(Duration::from_secs(0)).as_secs().to_string(),
                modified_time: modified_time.duration_since(SystemTime::UNIX_EPOCH).unwrap_or(Duration::from_secs(0)).as_secs().to_string(),
                accessed_time: accessed_time.duration_since(SystemTime::UNIX_EPOCH).unwrap_or(Duration::from_secs(0)).as_secs().to_string(),
            })
        }
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
fn move_file_to_trash(file_path: String) -> Result<(), String> {
    trash::delete(&file_path).map_err(|e| e.to_string())
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_file_metadata, move_file_to_trash])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
